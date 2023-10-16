module.exports = (sequelize, Sequelize, DataTypes) => {
    const LecturerModel = require("./lecturer.models")(sequelize, Sequelize, DataTypes);

    const CommissionerModel = sequelize.define(
        "commissioner", // Model name
        {
            // Attributes 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            lecturer: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            board: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "commissioner",
        }
    );

    // Define the association between StudentModel and MajorModel
    CommissionerModel.belongsTo(LecturerModel, {
        foreignKey: "lecturer",
        as: "lecturerInfo",
    });


    // FileModel.belongsTo(LecturerModel, {
    //     foreignKey: "lecturer",
    //     as: "lecturerInfo",
    // });

    return CommissionerModel;
};
