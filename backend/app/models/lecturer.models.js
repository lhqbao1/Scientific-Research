module.exports = (sequelize, Sequelize, DataTypes) => {

  const WorkplaceModel = require("./workplace.models")(sequelize, Sequelize, DataTypes);
  // const ExplanationModel = require("./explanation.model")(sequelize, Sequelize, DataTypes);
  const TopicModel = require("./topic.model")(sequelize, Sequelize, DataTypes);

  const InvitationModel = require("./invitation.models")(sequelize, Sequelize, DataTypes);


  const LecturerModel = sequelize.define(
    "lecturer", // Model name
    {
      // Attributes
      lecturer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      lecturer_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      position: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      degree: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      work_place_id: {
        type: DataTypes.STRING(11), // Change the data type to match SQL schema
        allowNull: false,
      },
      explanationboard: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      explanationrole: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      // Options
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "lecturers",
    }
  );

  // Define the association between LecturerModel and WorkplaceModel
  LecturerModel.belongsTo(WorkplaceModel, {
    foreignKey: "work_place_id", // Use the correct foreign key
    as: "workplace",
  });

  // LecturerModel.belongsTo(ExplanationModel, {
  //   foreignKey: "explanationboard", // Use the correct foreign key
  //   as: "coucil",
  // });

  LecturerModel.hasMany(InvitationModel, {
    foreignKey: "lecturer",
    as: "invitation",
  });

  LecturerModel.hasMany(TopicModel, {
    foreignKey: "lecturer_id",
    as: "topic",
  });





  return LecturerModel;
};
