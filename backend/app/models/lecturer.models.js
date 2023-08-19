// models/lecturer.model.js

module.exports = (sequelize, DataTypes) => {
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
        unique: true,
      },
      work_place: {
        type: DataTypes.TEXT,
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

  return LecturerModel;
};
