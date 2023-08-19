const config = require("../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: false,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize, DataTypes);
db.student = require("./student.models.js")(sequelize, Sequelize, DataTypes);
db.lecturer = require("./lecturer.models.js")(sequelize, Sequelize, DataTypes);
db.topic = require("./topic.model.js")(sequelize, Sequelize, DataTypes);
db.major = require("./major.model.js")(sequelize, Sequelize, DataTypes);
db.role = require("./role.model.js")(sequelize, Sequelize, DataTypes);

db.role.hasMany(db.user);
db.user.belongsTo(db.role);


db.ROLES = ["user", "admin"];

module.exports = db;
