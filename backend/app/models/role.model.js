module.exports = (sequelize, Sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      roleCode: {
        type: DataTypes.STRING,
        allowNull: false
        // default: "student",
      },
    },
    {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      freezeTableName: true,
      tableName: "roles",
    }
  );

  return Role;
};
