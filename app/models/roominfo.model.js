module.exports = (sequelize, Sequelize) => {
    const Roominfo = sequelize.define("roominfo", {
      roomId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      roomNo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      roomSpace: {
        type: Sequelize.INTEGER,
      },
      roomStatus: {
        type: Sequelize.INTEGER,
      },
    });
  
    return Roominfo;
  };