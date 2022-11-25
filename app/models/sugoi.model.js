module.exports = (sequelize, Sequelize) => {
    const Sugoi = sequelize.define("sugoi", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Sugoi;
  };