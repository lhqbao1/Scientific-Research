module.exports = (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        default: '123456',
        allowNull: false
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      sub_role: {
        type: DataTypes.TEXT,
        allowNull: true
      },

    },
    {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      freezeTableName: true,
      tableName: "users",
    }
  );



  return User;
};
