module.exports = (sequelize, Sequelize, DataTypes) => {

    // const TopicModel = require("./topic.model")(sequelize, Sequelize, DataTypes);
    // const LecturerModel = require("./lecturer.models")(sequelize, Sequelize, DataTypes);

    const TranscriptScoreModel = sequelize.define(
        "transcriptscore", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            score1: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            score2: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            score3: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            score4: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            score5: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            score6: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            score7: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

            score8: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },



        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "transcriptscore",
        }
    );



    return TranscriptScoreModel;
};
