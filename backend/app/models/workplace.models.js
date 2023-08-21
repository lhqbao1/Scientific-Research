module.exports = (sequelize, Sequelize, DataTypes) => {
  const WorkPlaceModel = sequelize.define(
    "workplace", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false,
      },
      workplace_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // Options
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "workplace",
    }
  );

  return WorkPlaceModel;
};
