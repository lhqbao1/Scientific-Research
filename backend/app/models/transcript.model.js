module.exports = (sequelize, Sequelize, DataTypes) => {

    const TopicModel = require("./topic.model")(sequelize, Sequelize, DataTypes);
    const LecturerModel = require("./lecturer.models")(sequelize, Sequelize, DataTypes);
    const TranscriptCommentModel = require("./transcriptcomment.model")(sequelize, Sequelize, DataTypes);
    const TranscriptScoreModel = require("./transcriptscore.model")(sequelize, Sequelize, DataTypes);

    const TranscriptModel = sequelize.define(
        "transcript", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            score: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            lecturer: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            topic: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            commentreport: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            scorereport: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "transcript",
        }
    );

    TranscriptModel.belongsTo(LecturerModel, {
        foreignKey: "lecturer",
        as: "lecturerInfo",
    });

    TranscriptModel.belongsTo(TopicModel, {
        foreignKey: "topic",
        as: "topicInfo",
    });

    TranscriptModel.belongsTo(TranscriptCommentModel, {
        foreignKey: "commentreport",
        as: "commentInfo",
    });
    TranscriptModel.belongsTo(TranscriptScoreModel, {
        foreignKey: "scorereport",
        as: "scoreInfo",
    });

    return TranscriptModel;
};
