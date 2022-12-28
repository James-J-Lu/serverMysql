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

  var Obj = req.body

  function incrementNumberInString(input) {
    var number = parseInt(input.trim().match(/\d+$/), 10)
    number++;
    number = '0000'.substring(0, '0000'.length - number.toString().length) + number;
    return 'MP' + number.toString();
  }

  var sent = 'fail'
  Memberpet.findAll({ order:[['petId', 'DESC']],limit:1 })
    .then(data => {
      console.log(data.length)
      if(data.length == 0) {
        console.log('here')
        Obj[Obj.length - 1].petId = 'MP0001';
      }
      else
        Obj[Obj.length - 1].petId = incrementNumberInString(data[0].petId)
      console.log(Obj[Obj.length - 1])
      // Save Memberpet in the database
      Memberpet.create(Obj[Obj.length - 1])
        .then(data => {
          Obj.pop()

          for(let i = 0; i < Obj.length; i++) {
            Memberpet.update(Obj[i], { where: { petId: Obj[i].petId } })
              .then(num => {
                sent = 'success'
              })
              .catch(err => {
                sent = 'faill'
              });
          }
        })
        .catch(err => {
          console.log(err + '32')
        });
      
      res.send(sent);
    })
    .catch(err => {
      console.log(err + '55')
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Members."
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
  if(req.body.petName == null) {
    res.status(400).send({
      message: "no pet to create"
    });
    return;
  }
  
  Memberpet.update(req.body, {
    where: { petId: req.body.petId }
  })
    .then(num => {
      res.send('success');
    })
    .catch(err => {
      console.log(err + '106')
      res.send('fail');
    });
};