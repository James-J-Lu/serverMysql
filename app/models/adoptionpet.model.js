module.exports = (sequelize, Sequelize) => {
    const Adoptionpet = sequelize.define("adoptionpet", {
      adoPetId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      adoPetName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adoPetFigure: {
        type: Sequelize.INTEGER
      },
      adoPetAge: {
        type: Sequelize.INTEGER
      },
      adoPetColor: {
        type: Sequelize.INTEGER
      },
      adoPetFur: {
        type: Sequelize.INTEGER
      },
      adoPetGender: {
        type: Sequelize.INTEGER
      },
      adoPetBreed: {
        type: Sequelize.INTEGER
      },
      adoPetDisease: {
        type: Sequelize.STRING
      },
      humanFriendly: {
        type: Sequelize.INTEGER
      },
      dogFriendly: {
        type: Sequelize.INTEGER
      },
      adoPetInfo: {
        type: Sequelize.STRING
      },
    });
  
    return Adoptionpet;
  };