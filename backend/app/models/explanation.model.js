module.exports = (sequelize, Sequelize, DataTypes) => {
    const LecturerModel = require("./lecturer.models")(sequelize, Sequelize, DataTypes);

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
    ExplanationModel.hasMany(LecturerModel, {
        foreignKey: "explanationboard",
        as: "lecturer",
    });


    // ExplanationModel.belongsTo(LecturerModel, {
    //     foreignKey: "lecturer",
    //     as: "lecturerInfo",
    // });

    return ExplanationModel;
};
