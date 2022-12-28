module.exports = (sequelize, Sequelize) => {
    const Memberpet = sequelize.define("memberpet", {
      petId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      memberId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      petName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      petGender: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      petSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isLigation: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      petDisease: {
        type: Sequelize.STRING,
      },
      dietaryHabit: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.TEXT('medium')
      }
    });
  
    return Memberpet;
  };