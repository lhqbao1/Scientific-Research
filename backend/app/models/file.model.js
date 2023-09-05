module.exports = (sequelize, Sequelize, DataTypes) => {
    // const StudentModal = require("./student.models")(sequelize, Sequelize, DataTypes);

    const FileModel = sequelize.define(
        "file", // Model name
        {
            // Attributes 
            file_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            file_name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            file_url: {
                type: DataTypes.BLOB,
                allowNull: false,
            },
            file_type: {
                type: DataTypes.TEXT,
                allowNull: false,
                defaultValue: "1",
            },
            topic_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "file",
        }
    );

    // Define the association between StudentModel and MajorModel
    // FileModel.belongsTo(StudentModal, {
    //     foreignKey: "student",
    //     as: "studentInfo",
    // });


    // FileModel.belongsTo(LecturerModel, {
    //     foreignKey: "lecturer",
    //     as: "lecturerInfo",
    // });

    return FileModel;
};
