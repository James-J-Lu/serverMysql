module.exports = app => {
    const member = require("../controllers/member.controller.js");
    const memberpet = require("../controllers/memberpet.controller.js");
    const adoption = require("../controllers/adoption.controller.js");
    const adoptionpet = require("../controllers/adoptionpet.controller.js");
    const roominfo = require("../controllers/roominfo.controller.js");
    const nurserypetorder = require("../controllers/nurserypetorder.controller.js")
    const adoptionorder = require("../controllers/adoptionorder.controller.js")
    const reserveroom = require("../controllers/reserveroom.controller.js")
  
    var router = require("express").Router();
    // Retrieve all member
    router.get("/member/", member.findAll);
    // Retrieve a single member with id
    router.get("/member/:id", member.findOne);
    // Create a new member
    router.post("/member/create", member.create);
    // Log in
    router.post("/member/login", member.logIn);
    // Update a member with id
    router.put("/member/:id", member.update);

// memberPet
    // Retrieve all memberpet
    router.get("/memberpet/", memberpet.findAll);
    // get specific member's pet
    router.get("/memberpet/MID/:id", memberpet.findAll);
    // Retrieve a single memberpet with id
    router.get("/memberpet/:id", memberpet.findOne);
    // Create a new memberpet
    router.post("/memberpet/", memberpet.create);
    // Update a memberpet with id
    router.put("/memberpet/:id", memberpet.update);

// adoption 會員領養資料 用想的應該OK了
    // 用member_id取得領養資料
    router.get("/adoption/MID/:id", adoption.findAll);
    // 進會員領養資料 -> 先findall(id) -> 如果沒有的話就要用create
    router.post("/adoption/", adoption.create);
    // 進會員領養資料 -> 先findall(id) -> 如果有就用update
    router.put("/adoption/:id", adoption.update);

// adoptionPet 被領養的狗狗
    // 找出所有狗狗，defaultMain, adoptMain
    router.post("/adoptionpet/prefer", adoptionpet.findAll);
    // 找出所有狗狗，defaultMain, adoptMain
    router.get("/adoptionpet/", adoptionpet.findAll);
    // Retrieve a single memberpet with id
    router.get("/adoptionpet/:id", adoptionpet.findOne);
    // Create a new memberpet
    router.post("/adoptionpet/", adoptionpet.create);
    // Update a memberpet with id
    router.put("/adoptionpet/:id", adoptionpet.update);

// 房間資訊，管理者房間，可能會用在托兒訂單
    // Retrieve all roominfo
    router.post("/roominfo/", roominfo.findAll);
    // Retrieve a single memberpet with id
    router.get("/roominfo/:id", roominfo.findOne);
    // Create a new memberpet
    router.post("/roominfo/", roominfo.create);
    // Update a memberpet with id
    router.put("/roominfo/:id", roominfo.update);
    

// 房間資訊，管理者房間，可能會用在托兒訂單
    // Retrieve all roominfo
    router.get("/nurserypetorder/", nurserypetorder.findAll);
    // Create a new memberpet
    router.post("/nurserypetorder/", nurserypetorder.create);
    // Update a memberpet with id
    router.put("/nurserypetorder/:id", nurserypetorder.update);
    // 用member_id取得領養資料
    router.get("/nurserypetorder/MID/:id", nurserypetorder.findAll);

// 房間資訊，管理者房間，可能會用在托兒訂單
    // Retrieve all roominfo
    router.get("/adoptionorder/", adoptionorder.findAll);
    // Create a new memberpet
    router.post("/adoptionorder/", adoptionorder.create);
    // Update a memberpet with id
    router.put("/adoptionorder/:id", adoptionorder.update);
    // 用member_id取得領養資料
    router.get("/adoptionorder/MID/:id", adoptionorder.findAll);

// 房間資訊，管理者房間，可能會用在托兒訂單
    // Retrieve all roominfo
    router.get("/reserveroom/", reserveroom.findAll);
    // Create a new memberpet
    router.post("/reserveroom/", reserveroom.create);
    // Update a memberpet with id
    router.put("/reserveroom/:id", reserveroom.update);
    // Get 全部時間某size房間在那些時間>總量
    router.post("/reserveroom/test", reserveroom.test);
    
    /*
    // Retrieve all published member
    router.get("/published", member.findAllPublished);
  
    // Delete a member with id
    router.delete("/:id", member.delete);
  
    // Delete all member
    router.delete("/", member.deleteAll);
  */
    app.use('/api', router);
  };