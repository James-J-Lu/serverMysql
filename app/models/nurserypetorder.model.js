module.exports = (sequelize, Sequelize) => {
    const Nurserypetorder = sequelize.define("nurserypetorder", {
        nurseryPetOrderId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      memberId_NPO: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      petId_NPO: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      roomId_NPO: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      startTime: {
        type: 'TIMESTAMP',
      },
      endTime: {
        type: 'TIMESTAMP',
      },
      price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
    });
  
    return Nurserypetorder;
  };