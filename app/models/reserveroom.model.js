module.exports = (sequelize, Sequelize) => {
    const Reserveroom = sequelize.define("reserveroom", {
      reserveId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      roomId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      orderId: {
        type: Sequelize.INTEGER,
      },
      startTime: {
        type: 'TIMESTAMP',
      },
      endtime: {
        type: 'TIMESTAMP',
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      managerId: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      roomSize: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  
    return Reserveroom;
  };