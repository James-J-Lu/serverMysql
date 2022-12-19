module.exports = (sequelize, Sequelize) => {
    const Adoption = sequelize.define("adoption", {
      adoptionId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      memberId_ap: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preferFigue: {
        type: Sequelize.INTEGER
      },
      preferAge: {
        type: Sequelize.INTEGER
      },
      preferColor: {
        type: Sequelize.INTEGER
      },
      preferFur: {
        type: Sequelize.INTEGER
      },
      preferGender: {
        type: Sequelize.INTEGER
      },
      preferBreed: {
        type: Sequelize.INTEGER
      },
      space: {
        type: Sequelize.STRING
      },
      hadPet: {
        type: Sequelize.INTEGER
      },
      hadDiseasePet: {
        type: Sequelize.INTEGER
      },
      canDiseasePet: {
        type: Sequelize.INTEGER
      },
      haveOtherPet: {
        type: Sequelize.INTEGER
      },
    });
  
    return Adoption;
  };