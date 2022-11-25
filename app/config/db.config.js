module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "SE2022group9",
    DB: "DogWeb",
      port:3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };