module.exports = (sequelize, Sequelize, DataTypes) => {
  const MajorModel = sequelize.define(
    "major", // Model name
    {
      // Attributes
      major_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      major_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // Options
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "major",
    }
  );

  return MajorModel;
};
