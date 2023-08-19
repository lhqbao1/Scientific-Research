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
