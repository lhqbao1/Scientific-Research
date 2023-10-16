module.exports = (sequelize, Sequelize, DataTypes) => {
    // const LecturerModel = require("./lecturer.models")(sequelize, Sequelize, DataTypes);

    const Editexplanation = sequelize.define(
        "editexplanation", // Model name
        {
            // Attributes 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            contentstudent: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            student: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            topic: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "editexplanation",
        }
    );

    // Define the association between StudentModel and MajorModel



    // FileModel.belongsTo(LecturerModel, {
    //     foreignKey: "lecturer",
    //     as: "lecturerInfo",
    // });

    return Editexplanation;
};
