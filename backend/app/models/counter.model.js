module.exports = (sequelize, Sequelize, DataTypes) => {
    const LecturerModel = require("./lecturer.models")(sequelize, Sequelize, DataTypes);

    const CounterModel = sequelize.define(
        "counter", // Model name
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
            tableName: "counter",
        }
    );

    // Define the association between StudentModel and MajorModel
    CounterModel.belongsTo(LecturerModel, {
        foreignKey: "lecturer",
        as: "lecturerInfo",
    });


    // FileModel.belongsTo(LecturerModel, {
    //     foreignKey: "lecturer",
    //     as: "lecturerInfo",
    // });

    return CounterModel;
};
