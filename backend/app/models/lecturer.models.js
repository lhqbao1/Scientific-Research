module.exports = (sequelize, Sequelize, DataTypes) => {
  const WorkplaceModel = require("./workplace.models")(
    sequelize,
    Sequelize,
    DataTypes
  );
  const TopicModel = require("./topic.model")(sequelize, Sequelize, DataTypes);
  const LecturerModel = sequelize.define(
    "lecturer", // Model name
    {
      // Attributes
      lecturer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      topic_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
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

  LecturerModel.belongsTo(TopicModel, {
    foreignKey: "topic_id",
    as: "topic",
  });

  return LecturerModel;
};
