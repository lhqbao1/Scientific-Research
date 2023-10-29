const db = require("../models");
const NotificationModel = db.notification;


const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {


        const notification = await NotificationModel.findAll({
            where: {
                [Op.or]: [
                    {
                        type: 'đợt 1'
                    },
                    {
                        type: 'đợt 2'
                    }
                ]
            }
        });



        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: notification,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findAllPhase2 = async (req, res) => {
    try {
        const notification = await NotificationModel.findAll({
            where: {
                type: 'đăng kí đợt 2'
            }
        });
        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: notification,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findAllAddFile = async (req, res) => {
    try {
        const notification = await NotificationModel.findAll({

            where: {
                [Op.or]: [
                    {
                        type: 'nghiệm thu và báo cáo đợt 1'
                    },
                    {
                        type: 'nghiệm thu và báo cáo đợt 2'
                    }
                ]
            }
        });
        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: notification,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findAllAddFile2 = async (req, res) => {
    try {
        const notification = await NotificationModel.findAll({
            where: {
                type: 'nghiệm thu và báo cáo đợt 2'
            }
        });
        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: notification,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findAddFileExplanation = async (req, res) => {
    try {
        const notification = await NotificationModel.findAll({

            where: {
                [Op.or]: [
                    {
                        type: 'Thông báo nộp hồ sơ thuyết minh đợt 1'
                    },
                    {
                        type: 'Thông báo nộp hồ sơ thuyết minh đợt 2'
                    }
                ]
            }
        });
        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: notification,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findStartReport = async (req, res) => {
    try {


        const notification = await NotificationModel.findAll({
            where: {
                [Op.or]: [
                    {
                        type: 'Bắt đầu nghiệm thu đợt 1'
                    },
                    {
                        type: 'Bắt đầu nghiệm thu đợt 2'
                    }
                ]
            }
        });



        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: notification,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {

        // const {
        //     name,
        //     content,
        //     start_date,
        //     end_date,
        //     students
        // } = req.body
        const notification = await NotificationModel.create(req.body);



        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: notification,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.update = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id lời mời!", null));
        }

        const notification = await NotificationModel.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!notification) {
            return res
                .status(400)
                .json(responsePayload(false, "Lời mời không tồn tại!", null));
        }

        // Update the lecturer record with the data from the request body
        notification.set(req.body);

        // Save the updated lecturer record
        await notification.save();

        res.json(
            responsePayload(
                true,
                "Cập nhật thông tin lời mời thành công!",
                notification
            )
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};













