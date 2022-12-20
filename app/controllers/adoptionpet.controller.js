const { adoptionpet } = require("../models");
const db = require("../models");
const Adoptionpet = db.adoptionpet;
const Op = db.Sequelize.Op;

// Create and Save a new Adoptionpet
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Adoptionpet
  const _adoptionpet_ = {
    id: req.body.id,
    adoptionpetAccount: req.body.account,
    adoptionpetPw: req.body.pw,
    adoptionpetName: req.body.name
  };
  
  // Save Adoptionpet in the database
  Adoptionpet.create(_adoptionpet_)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Adoptionpet."
      });
    });
  
};

// Find a single Adoptionpet with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Adoptionpet.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Adoptionpet with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Adoptionpet with id=" + id
      });
    });
};

// Retrieve all Adoptionpets from the database.
exports.findAll = (req, res) => {

  Object.entries(req.body).forEach((obj) => {
    if(obj[1] == 0)
      delete req.body[obj[0]]
  })
  console.log(req.body)
  var condition = req.body;

  Adoptionpet.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Adoptionpets."
      });
    });
};

// Update a Adoptionpet by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Adoptionpet.update(req.body, {
    where: { adoPetId: id }
  })
    .then(num => {
      if (num == 1) {
        console.log(1);
        res.send('success');
      } else {
        console.log(0);
        res.send({
          message: `Cannot update Adoptionpet with id=${id}. Maybe Adoptionpet was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.log(2);
      res.status(500).send({
        message:
          err.message || "Error updating Adoptionpet with id=" + id
      });
    });
};