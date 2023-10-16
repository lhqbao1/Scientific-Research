
module.exports = (sequelize, Sequelize, DataTypes) => {
    // const StudentModal = require("./student.models")(sequelize, Sequelize, DataTypes);
    const TopicModel = require("./topic.model")(sequelize, Sequelize, DataTypes);
    const StatusModel = require("./status.model")(sequelize, Sequelize, DataTypes);

    const InvitationAcceptanceModel = sequelize.define(
        "invitationacceptance", // Model name
        {
            // Attributes 
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            advisor: {
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
            type: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "invitationacceptance",
        }
    );

    // Define the association between StudentModel and MajorModel
    // InvitationModel.belongsTo(StudentModal, {
    //     foreignKey: "student",
    //     as: "studentInfo",
    // });


    InvitationAcceptanceModel.belongsTo(TopicModel, {
        foreignKey: "topic",
        as: "topicInfo",
    });

    InvitationAcceptanceModel.belongsTo(StatusModel, {
        foreignKey: "status",
        as: "statusInfo",
    });

    return InvitationAcceptanceModel;
};
