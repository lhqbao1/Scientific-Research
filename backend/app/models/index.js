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
db.workplace = require("./workplace.models.js")(
  sequelize,
  Sequelize,
  DataTypes
);
db.topic = require("./topic.model.js")(sequelize, Sequelize, DataTypes);
db.major = require("./major.model.js")(sequelize, Sequelize, DataTypes);
db.role = require("./role.model.js")(sequelize, Sequelize, DataTypes);
db.invitation = require("./invitation.models.js")(sequelize, Sequelize, DataTypes)
db.invitationacceptance = require("./invitationacceptance.model.js")(sequelize, Sequelize, DataTypes)
db.file = require("./file.model.js")(sequelize, Sequelize, DataTypes)
db.status = require("./status.model.js")(sequelize, Sequelize, DataTypes)
db.explanation = require("./explanation.model.js")(sequelize, Sequelize, DataTypes)
db.transcript = require("./transcript.model.js")(sequelize, Sequelize, DataTypes)
db.commissioner = require("./commissioner.model.js")(sequelize, Sequelize, DataTypes)
db.counter = require("./counter.model.js")(sequelize, Sequelize, DataTypes)

db.notification = require("./notification.model.js")(sequelize, Sequelize, DataTypes)
db.editexplanation = require("./editexplanation.model.js")(sequelize, Sequelize, DataTypes)
db.transcriptcomment = require("./transcriptcomment.model.js")(sequelize, Sequelize, DataTypes)
db.transcriptscore = require("./transcriptscore.model.js")(sequelize, Sequelize, DataTypes)



db.role.hasMany(db.user, {
  foreignKey: 'role',
  as: 'roleInfo'
})
db.user.belongsTo(db.role, {
  foreignKey: 'role',
  as: 'roleInfo'
});
db.student.belongsTo(db.topic, {
  foreignKey: "topic_id",
  as: "topicInfo"
})
db.topic.belongsTo(db.lecturer, {
  foreignKey: "lecturer_id",
  as: "lecturerInfo"
})
db.invitation.belongsTo(db.lecturer, {
  foreignKey: "lecturer",
  as: "lecturerInfo",
})

db.invitationacceptance.belongsTo(db.lecturer, {
  foreignKey: "lecturer",
  as: "lecturerInfo",
})

db.invitationacceptance.belongsTo(db.lecturer, {
  foreignKey: "advisor",
  as: "advisorInfo",
})




db.topic.belongsTo(db.lecturer, {
  foreignKey: "lecturer_id",
  as: "lecturer",
})
db.topic.belongsTo(db.explanation, {
  foreignKey: "explanationboard",
  as: "board",
})
db.topic.belongsTo(db.explanation, {
  foreignKey: "acceptanceboard",
  as: "accBoard",
})

db.lecturer.hasMany(db.explanation, {
  foreignKey: "president",
  as: "presidentInfo",
})
db.lecturer.hasMany(db.explanation, {
  foreignKey: "secretary",
  as: "secretaryInfo",
})
db.lecturer.hasMany(db.explanation, {
  foreignKey: "couter",
  as: "couterInfo",
})

db.lecturer.hasMany(db.commissioner, {
  foreignKey: "lecturer",
  as: "commissionerInfo",
});



db.commissioner.belongsTo(db.explanation, {
  foreignKey: "board",
  as: "boardInfo",
});

db.counter.belongsTo(db.explanation, {
  foreignKey: "board",
  as: "boardInfo",
});

// db.ROLES = ["student", "admin"];

module.exports = db;
