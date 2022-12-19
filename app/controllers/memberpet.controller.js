const { memberpet } = require("../models");
const db = require("../models");
const Memberpet = db.memberpet;
const Op = db.Sequelize.Op;

// Create and Save a new Memberpet
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Memberpet
  const _memberpet_ = {
    id: req.body.id,
    memberpetAccount: req.body.account,
    memberpetPw: req.body.pw,
    memberpetName: req.body.name
  };
  
  // Save Memberpet in the database
  Memberpet.create(_memberpet_)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Memberpet."
      });
    });
  
};

// Find a single Memberpet with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Memberpet.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Memberpet with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Memberpet with id=" + id
      });
    });
};

// Retrieve all Memberpets from the database.
exports.findAll = (req, res) => {
  
  const memberid = req.params.id;
  var condition = memberid ? { memberId: memberid } : null;
  
  Memberpet.findAll({ where: condition })
    .then(data => {
      if(data != [])
        res.send(data);
      else
        res.send('nothing')
    })
    .catch(err => {
      res.status(500).send({
        err
      });
    });
};

// Update a Memberpet by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const _memberpet_ = {
    memberpetAccount: req.body.account,
    memberpetPw: req.body.pw,
    memberpetName: req.body.name
  };

  Memberpet.update(_memberpet_, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        console.log(1);
        res.send({
          message: "Memberpet was updated successfully."
        });
      } else {
        console.log(0);
        res.send({
          message: `Cannot update Memberpet with id=${id}. Maybe Memberpet was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.log(2);
      res.status(500).send({
        message:
          err.message || "Error updating Memberpet with id=" + id
      });
    });
};