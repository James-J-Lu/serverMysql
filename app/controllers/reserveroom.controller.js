const { reserveroom } = require("../models");
const db = require("../models");
const Reserveroom = db.reserveroom;
const Op = db.Sequelize.Op;

exports.test = (req, res) => {
    
    var condition = { roomSize: req.body.size, endtime: { [Op.gte]: req.body.time}, status: {[Op.ne]: 0} }
    //取出所有在startTime前還未退房的紀錄
    Reserveroom.findAll({ where: condition })
        .then(data => {
            res.send(incrementNumberInString(data))
        })
        .catch(err => {
            console.log(err + '17')
            res.status(500).send(err);
        });

    function incrementNumberInString(input) {
        var NotCheckout = input;
        var Timelist = {};

        for(var i = 0; i < NotCheckout.length; i++) {
            var time1 = NotCheckout[i].startTime

            while(time1 <= NotCheckout[i].endtime) {
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

  function incrementNumberInString(input) {
    var number = parseInt(input.trim().match(/\d+$/), 10)
    number++;
    number = '0000'.substring(0, '0000'.length - number.toString().length) + number;
    return 'RR' + number.toString();
  }
  
  Reserveroom.findAll({ order:[['reserveId', 'DESC']],limit:1 })
    .then(data => {
      if(data.length == 0)
        req.body.reserveId = 'RR0001';
      else
        req.body.reserveId = incrementNumberInString(data[0].reserveId);
      console.log(req.body)
      Reserveroom.create(req.body)
        .then(data => {
          res.send('success');
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
  var condition = { orderId: req.params.id }

  Reserveroom.update(req.body, {
    where: condition
  })
    .then(num => {
      if (num == 1) {
        res.send('success');
      } else {
        res.send('fail');
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