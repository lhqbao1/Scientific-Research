module.exports = (sequelize, Sequelize, DataTypes) => {
    const LecturerModel = require("./lecturer.models")(sequelize, Sequelize, DataTypes);
    const TopicModel = require("./topic.model")(sequelize, Sequelize, DataTypes);
    const CommissionerModel = require("./commissioner.model")(sequelize, Sequelize, DataTypes);
    const CounterModel = require("./counter.model")(sequelize, Sequelize, DataTypes);

    const ExplanationModel = sequelize.define(
        "explanation", // Model name
        {
            // Attributes 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            phase: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            president: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            secretary: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            couter: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            commissioner1: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            commissioner2: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            commissioner3: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "explanationboard",
        }
    );

    // Define the association between StudentModel and MajorModel
    ExplanationModel.hasMany(TopicModel, {
        foreignKey: "explanationboard",
        as: "topicInfo",
    });
    ExplanationModel.hasMany(TopicModel, {
        foreignKey: "acceptanceboard",
        as: "topicAccInfo",
    });
    ExplanationModel.belongsTo(LecturerModel, {
        foreignKey: "president",
        as: "presidentInfo",
    });
    ExplanationModel.belongsTo(LecturerModel, {
        foreignKey: "secretary",
        as: "secretaryInfo",
    });
    ExplanationModel.belongsTo(LecturerModel, {
        foreignKey: "couter",
        as: "couterInfo",
    });


    ExplanationModel.hasMany(CommissionerModel, {
        foreignKey: "board",
        as: "commissioners",
    });
    ExplanationModel.hasMany(CounterModel, {
        foreignKey: "board",
        as: "counter",
    });

    return ExplanationModel;
};
