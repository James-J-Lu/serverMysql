const { adoptionorder } = require("../models");
const db = require("../models");
const Adoptionorder = db.adoptionorder;
const Op = db.Sequelize.Op;

// Create and Save a new Adoptionorder
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Adoptionorder
  const _adoptionorder_ = {
    id: req.body.id,
    adoptionorderAccount: req.body.account,
    adoptionorderPw: req.body.pw,
    adoptionorderName: req.body.name
  };
  
  // Save Adoptionorder in the database
  Adoptionorder.create(_adoptionorder_)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Adoptionorder."
      });
    });
  
};

// Retrieve all Adoptionorders from the database.
exports.findAll = (req, res) => {

  const memberid = req.params.id;
  var condition = memberid ? { memberId_NPO: memberid } : null;

  Adoptionorder.findAll({ where: condition })
    .then(data => {
      if(data != [])
        res.send(data);
      else
        res.send('nothing')
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Adoptionorders."
      });
    });
};

// Update a Adoptionorder by the id in the request
exports.update = (req, res) => {

  function notNulltoInt(input) {
    if(input != null)
      input = parseInt(input, 10);
    return input;
  }
  req.body.preferFigue = notNulltoInt(req.body.preferFigue)
  req.body.preferAge = notNulltoInt(req.body.preferAge)
  req.body.preferColor = notNulltoInt(req.body.preferColor)
  req.body.preferFur = notNulltoInt(req.body.preferFur)
  req.body.preferGender = notNulltoInt(req.body.preferGender)
  req.body.preferBreed = notNulltoInt(req.body.preferBreed)
  req.body.hadPet = notNulltoInt(req.body.hadPet)
  req.body.hadDiseasePet = notNulltoInt(req.body.hadDiseasePet)
  req.body.canDiseasePet = notNulltoInt(req.body.canDiseasePet)
  req.body.haveOtherPet = notNulltoInt(req.body.haveOtherPet)

  Adoptionorder.update(req.body, {
    where: { memberId_ap: req.body.memberId_ap}
  })
    .then(num => {
      if (num == 1) {
        res.send('success')
      } else {
        res.send('fail')
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Error updating Adoptionorder with id=" + id
      });
    });
};