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

  function incrementNumberInString(input) {
    var number = parseInt(input.trim().match(/\d+$/), 10),
        letter = input.trim().match(/^[A-Za-z]/)[0];
    number++;
    number = '000'.substring(0, '000'.length - number.toString().length) + number;
    return letter + number.toString();
  }
  
  Adoptionorder.findAll({ order:[['adoptionOrderId', 'DESC']],limit:1 })
    .then(data => {
      if(data.length == 0)
        req.body.adoptionOrderId = 'AO0001';
      else
        req.body.adoptionOrderId = incrementNumberInString(data[0].adoptionOrderId);
      
      Adoptionorder.create(req.body)
        .then(data => {
          res.send('success');
        })
        .catch(err => {
          console.log(err + '37')
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Adoptionorder."
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

// Retrieve all Adoptionorders from the database.
exports.findAll = (req, res) => {
  var condition = null
  if(req.params.id)
    condition = { memberId_AO: req.params.id };

  Adoptionorder.findAll({ where: condition })
    .then(data => {
      if(data != []) {
        res.send(data);
      }
      else
        res.send('nothing')
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Adoptionorders."
      });
    });
};

// Update a Adoptionorder by the id in the request
exports.update = (req, res) => {

  Adoptionorder.update(req.body, {
    where: { adoptionOrderId: req.body.adoptionOrderId}
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