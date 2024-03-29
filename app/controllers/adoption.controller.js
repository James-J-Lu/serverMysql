const { adoption } = require("../models");
const db = require("../models");
const Adoption = db.adoption;
const Op = db.Sequelize.Op;

// Create and Save a new Adoption
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  function incrementNumberInString(input) {
    var number = parseInt(input.trim().match(/\d+$/), 10)
    number++;
    number = '000'.substring(0, '000'.length - number.toString().length) + number;
    return 'AM' + number.toString();
  }
  
  Adoption.findAll({ order:[['adoptionId', 'DESC']],limit:1 })
    .then(data => {
      if(data.length == 0)
        req.body.adoptionId = 'AM003';
      else
        req.body.adoptionId = incrementNumberInString(data[0].adoptionId);
      
      // Save Adoption in the database
      Adoption.create(req.body)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          console.log(err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Adoption."
          });
        });
    })
    .catch(err => {
      console.log(err + '45')
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Members."
      });
    });
};

// Retrieve all Adoptions from the database.
exports.findAll = (req, res) => {

  const memberid = req.params.id;
  var condition = memberid ? { memberId_ap: memberid } : null;

  Adoption.findAll({ where: condition })
    .then(data => {
      if(data != [])
        res.send(data);
      else
        res.send('nothing')
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Adoptions."
      });
    });
};

// Update a Adoption by the id in the request
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

  Adoption.update(req.body, {
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
          err.message || "Error updating Adoption with id=" + id
      });
    });
};