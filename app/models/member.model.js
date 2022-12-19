module.exports = (sequelize, Sequelize) => {
    const Member = sequelize.define("member", {
      memberId: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      memberAccount: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      memberPassword: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      memberName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      memberGender: {
        type: Sequelize.INTEGER,
      },
      memberBirth: {
        type: Sequelize.STRING,
      },
      memberTel: {
        type: Sequelize.STRING,
      },
      memberPhone: {
        type: Sequelize.STRING,
      },
      memberAddress: {
        type: Sequelize.STRING,
      },
      memberEmail: {
        type: Sequelize.STRING,
      },
      willAdopt: {
        type: Sequelize.INTEGER,
      },
    });
  
    return Member;
  };