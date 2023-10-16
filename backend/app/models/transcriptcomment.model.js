module.exports = (sequelize, Sequelize, DataTypes) => {

    // const TopicModel = require("./topic.model")(sequelize, Sequelize, DataTypes);
    // const LecturerModel = require("./lecturer.models")(sequelize, Sequelize, DataTypes);

    const TranscriptCommentModel = sequelize.define(
        "transcriptcomment", // Model name
        {
            // Attributes
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            comment1: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            comment2: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            comment3: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            comment4: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            comment5: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            comment6: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            comment7: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            comment8: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

            comment9: {
                type: DataTypes.TEXT,
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
            tableName: "transcriptcomment",
        }
    );



    return TranscriptCommentModel;
};
