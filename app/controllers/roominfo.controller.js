const { roominfo } = require("../models");
const db = require("../models");
const Roominfo = db.roominfo;
const Op = db.Sequelize.Op;

// Create and Save a new Roominfo
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Roominfo
  const _roominfo_ = {
    id: req.body.id,
    roominfoAccount: req.body.account,
    roominfoPw: req.body.pw,
    roominfoName: req.body.name
  };
  
  // Save Roominfo in the database
  Roominfo.create(_roominfo_)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Roominfo."
      });
    });
  
};

// Find a single Roominfo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Roominfo.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Roominfo with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Roominfo with id=" + id
      });
    });
};

// Retrieve all Roominfos from the database.
exports.findAll = (req, res) => {
  
  var condition = req.body;
  console.log(req.body)

  Roominfo.findAll({ where: condition })
    .then(data => {
      var len = data.length.toString()
      console.log(len)
      res.send(len);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Roominfos."
      });
    });
};

// Update a Roominfo by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const _roominfo_ = {
    roominfoAccount: req.body.account,
    roominfoPw: req.body.pw,
    roominfoName: req.body.name
  };

  Roominfo.update(_roominfo_, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        console.log(1);
        res.send({
          message: "Roominfo was updated successfully."
        });
      } else {
        console.log(0);
        res.send({
          message: `Cannot update Roominfo with id=${id}. Maybe Roominfo was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.log(2);
      res.status(500).send({
        message:
          err.message || "Error updating Roominfo with id=" + id
      });
    });
};