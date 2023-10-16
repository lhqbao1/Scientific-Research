module.exports = (sequelize, Sequelize, DataTypes) => {
    const NotificationModel = sequelize.define(
        "notification", // Model name
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
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            start_date: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            end_date: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            students: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            date: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            topic: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            // Options
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: "notification",
        }
    );

    return NotificationModel;
};
