
module.exports = (sequelize, Sequelize, DataTypes) => {
    const StudentModal = require("./student.models")(sequelize, Sequelize, DataTypes);
    const TopicModel = require("./topic.model")(sequelize, Sequelize, DataTypes);
    // const LecturerModel = require("./lecturer.models")(sequelize, Sequelize, DataTypes);

    const InvitationModel = sequelize.define(
        "invitation", // Model name
        {
            // Attributes 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            student: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            lecturer: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: "1",
            },
            topic: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "invitation",
        }
    );

    // Define the association between StudentModel and MajorModel
    InvitationModel.belongsTo(StudentModal, {
        foreignKey: "student",
        as: "studentInfo",
    });


    InvitationModel.belongsTo(TopicModel, {
        foreignKey: "topic",
        as: "topicInfo",
    });

    return InvitationModel;
};
