const { reserveroom } = require("../models");
const db = require("../models");
const Reserveroom = db.reserveroom;
const Op = db.Sequelize.Op;

exports.test = (req, res) => {
    // req.body.total = 該房型的總數
    // req.body.size = 現在要查的room size
    console.log(req.body)
    var condition = { roomSize: req.body.size, endtime: { [Op.gte]: req.body.time} }
    
    //取出所有在startTime前還未退房的紀錄
    Reserveroom.findAll({ where: condition })
        .then(data => {
            res.send(incrementNumberInString(data))
        })
        .catch(err => {
            console.log(err + '17')
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving Reserverooms."
            });
        });

    function incrementNumberInString(input) {
        var NotCheckout = input;
        var Timelist = {};

        for(var i = 0; i < NotCheckout.length; i++) {
            var time1 = NotCheckout[i].startTime
            while(time1 <= NotCheckout[i].endTime) {
                if(!Timelist[time1])
                    Timelist[time1] = 1
                else
                    Timelist[time1] += 1

                time1 = time1.split('-')[0] + '-' + time1.split('-')[1] + '-' + (Number(time1.split('-')[2]) + 1).toString()
            }
        }
        return Timelist;
    }

};

// Create and Save a new Reserveroom
exports.create = (req, res) => {
  // Validate request
  if (!req) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  // Save Reserveroom in the database
  Reserveroom.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Reserveroom."
      });
    });
  
};

// Find a single Reserveroom with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Reserveroom.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Reserveroom with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Reserveroom with id=" + id
      });
    });
};

// Retrieve all Reserverooms from the database.
exports.findAll = (req, res) => {

  const memberid = req.params.id;
  var condition = memberid ? { memberId_ap: memberid } : null;

  Reserveroom.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Reserverooms."
      });
    });
};

// Update a Reserveroom by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const _reserveroom_ = {
    reserveroomAccount: req.body.account,
    reserveroomPw: req.body.pw,
    reserveroomName: req.body.name
  };

  Reserveroom.update(_reserveroom_, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        console.log(1);
        res.send({
          message: "Reserveroom was updated successfully."
        });
      } else {
        console.log(0);
        res.send({
          message: `Cannot update Reserveroom with id=${id}. Maybe Reserveroom was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      console.log(2);
      res.status(500).send({
        message:
          err.message || "Error updating Reserveroom with id=" + id
      });
    });
};