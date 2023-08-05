module.exports = (sequelize, Sequelize, DataTypes) => {
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
      research_area: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      basic_description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      advisor_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
      topic_manager_id: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      // Options
      timestamps: false,
      underscored: true,
      freezeTableName: true,
      tableName: "topics",
    }
  );

  return TopicModel;
};
