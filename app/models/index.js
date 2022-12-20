const db = {};
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  define: {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    deletedAt: 'deleted_at',
    paranoid:true
  },

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.member = require("./member.model.js")(sequelize, Sequelize);
db.adoption = require("./adoption.model.js")(sequelize, Sequelize);
db.memberpet = require("./memberpet.model.js")(sequelize, Sequelize);
db.adoptionpet = require("./adoptionpet.model.js")(sequelize, Sequelize);
db.roominfo = require("./roominfo.model.js")(sequelize, Sequelize);
db.nurserypetorder = require("./nurserypetorder.model.js")(sequelize, Sequelize);
db.adoptionorder = require("./adoptionorder.model.js")(sequelize, Sequelize);
db.reserveroom = require("./reserveroom.model.js")(sequelize, Sequelize);

// froeign key
// db.member.hasOne(db.adoption, {
//   foreignKey: 'memberId_ap'
// });
// db.adoption.belongsTo(db.member);

// db.member.hasMany(db.memberpet, {
//   foreignKey: 'memberId'
// });
// db.memberpet.belongsTo(db.member);

module.exports = db;