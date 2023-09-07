module.exports = (sequelize, Sequelize, DataTypes) => {

    const StatusModel = sequelize.define(
        "status", // Model name
        {
            // Attributes 
            status_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            status: {
                type: DataTypes.TEXT,
                allowNull: false,
            },

        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "status",
        }
    );
    // Define the association between StudentModel and MajorModel



    // StatusModel.belongsTo(LecturerModel, {
    //     foreignKey: "lecturer",
    //     as: "lecturerInfo",
    // });

    return StatusModel;
};
