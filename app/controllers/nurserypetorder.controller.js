const { nurserypetorder } = require("../models");
const db = require("../models");
const Nurserypetorder = db.nurserypetorder;
const Op = db.Sequelize.Op;

// Create and Save a new Nurserypetorder
exports.create = (req, res) => {
  const memberid = req.params.size;
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
    number = '0000'.substring(0, '0000'.length - number.toString().length) + number;
    return 'NPO' + number.toString();
  }

  if(req.params.size == 1)
    req.body.roomId_NPO = 'R003'
  else  if(req.params.size == 2)
    req.body.roomId_NPO = 'R006'
  else  if(req.params.size == 3)
    req.body.roomId_NPO = 'R009'

  Nurserypetorder.findAll({ order:[['nurseryPetOrderId', 'DESC']],limit:1 })
    .then(data => {
      if(data.length == 0)
        req.body.nurseryPetOrderId = 'NPO0001';
      else
        req.body.nurseryPetOrderId = incrementNumberInString(data[0].nurseryPetOrderId);

      Nurserypetorder.create(req.body)
        .then(data => {
          res.send(req.body.nurseryPetOrderId);
        })
        .catch(err => {
          console.log(err + '38')
          res.send('fail');
        });
    })
    .catch(err => {
      console.log(err + '46')
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Members."
      });
    });
};

// Retrieve all Nurserypetorders from the database.
exports.findAll = (req, res) => {

  const memberid = req.params.id;
  var condition = memberid ? { memberId_NPO: memberid } : null;

  Nurserypetorder.findAll({ where: condition })
    .then(data => {
      if(data != [])
        res.send(data);
      else
        res.send('nothing')
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Nurserypetorders."
      });
    });
};

// Update a Nurserypetorder by the id in the request
exports.update = (req, res) => {
  console.log(req.body)

  Nurserypetorder.update(req.body, {
    where: { nurseryPetOrderId: req.body.nurseryPetOrderId}
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
          err.message || "Error updating Nurserypetorder with id=" + id
      });
    });
};