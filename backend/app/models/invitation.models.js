module.exports = (sequelize, Sequelize, DataTypes) => {
    // const StudentModal = require("./student.models")(sequelize, Sequelize, DataTypes);

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
            accepted: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: "1",
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

    // // Define the association between StudentModel and MajorModel
    // InvitationModel.belongsTo(StudentModal, {
    //   foreignKey: "topic_id",
    //   as: "student",
    // });

    return InvitationModel;
};
