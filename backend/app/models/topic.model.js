module.exports = (sequelize, Sequelize, DataTypes) => {
  const StatusModel = require("./status.model")(sequelize, Sequelize, DataTypes);
  const StudentModel = require("./student.models")(sequelize, Sequelize, DataTypes);
  const FileModel = require("./file.model")(sequelize, Sequelize, DataTypes);
  // const LecturerModel = require("./lecturer.models")(sequelize, Sequelize, DataTypes);
  // const Ex = require("./explanation.model")(sequelize, Sequelize, DataTypes)
  // const ExplanationModel = require("./explanation.model")(sequelize, Sequelize, DataTypes);

  const TopicModel = sequelize.define(
    "topic", // Model name
    {
      // Attributes 
      topic_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      topic_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      topic_code: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      research_area: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      basic_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lecturer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      topic_status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 3
      },
      explanationboard: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      acceptanceboard: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      acceptancedate: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cost: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      duration: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phase: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      acceptanceplace: {
        type: DataTypes.TEXT,
        allowNull: true,
      }

    },
    {
      // Options
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "topics",
    }
  );

  // // Define the association between StudentModel and MajorModel
  TopicModel.belongsTo(StatusModel, {
    foreignKey: "topic_status",
    as: "status",
  });



  TopicModel.hasMany(StudentModel, {
    foreignKey: "topic_id",
    as: "student",
  });

  TopicModel.hasMany(FileModel, {
    foreignKey: "topic_id",
    as: "file",
  });

  // TopicModel.belongsTo(LecturerModel, {
  //   foreignKey: "lecturer_id",
  //   as: "lecturer",
  // });

  return TopicModel;
};
