module.exports = (sequelize, Sequelize) => {
    const Adoptionorder = sequelize.define("adoptionorder", {
      adoptionOrderId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      memberId_AO: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      adoPetId_AO: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      appointmentTime: {
        type: 'DATETIME',
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  
    return Adoptionorder;
  };