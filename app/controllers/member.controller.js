const { member } = require("../models");
const db = require("../models");
const Member = db.member;
const Op = db.Sequelize.Op;

// Create and Save a new Member
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

  Member.findAll({ order:[['memberId', 'DESC']],limit:1 })
    .then(data => {
      if(data.length == 0)
        req.body.memberId = 'M001';
      else
        req.body.memberId = incrementNumberInString(data[0].memberId)
      // Save Member in the database
      Member.create(req.body)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Member."
          });
        });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Members."
      });
    });
};

exports.logIn = (req, res) => {

  const account = req.body.account;
  var condition = account ? { memberAccount: account } : null;

  Member.findAll({ where: condition })
    .then(data => {
      var text
      if(data.length == 0) {
        text = 'can sign in'
      }
      else if(data.length != 0) {
        if(data[0].memberPassword == req.body.pw)
          text =data[0]
        else if(data[0].memberPassword != req.body.pw)
          text = false
      }
      res.send(text)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Members."
      });
    });
}

// Find a single Member with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  
  Member.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Member with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error retrieving Member with id=" + id
      });
    });
};

var count = 0
// Retrieve all Members from the database.
exports.findAll = (req, res) => {
  count += 1
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Member.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Members."
      });
    });

  console.log(count)
};

// Update a Member by the id in the request
exports.update = (req, res) => {
  function notNulltoInt(input) {
    if(input != null)
      input = parseInt(input, 10);
    return input;
  }
  req.body.memberGender = notNulltoInt(req.body.memberGender)
  req.body.willAdopt = notNulltoInt(req.body.willAdopt)

  Member.update(req.body, {
    where: { memberId: req.body.memberId }
  })
    .then(num => {
      if (num == 1) {
        res.send('success')
      } else {
        res.send('fail')
      }
    })
    .catch(err => {
      console.log(2);
      res.status(500).send({
        message:
          err.message || "Error updating Member with id=" + id
      });
    });
};

/*
// Delete a Member with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Member.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Member was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Member with id=${id}. Maybe Member was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Member with id=" + id
      });
    });
};

// Delete all Members from the database.
exports.deleteAll = (req, res) => {
  Member.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Members were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Members."
      });
    });
};

// Find column's value Members
exports.findAllstauts = (req, res) => {
  Member.findAll({ where: { stauts: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Members."
      });
    });
};
*/