const db = require("../models");
const StatusModel = db.status
const { Op } = require("sequelize");
// const statusModel = require("../models/status.model");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});


exports.findById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id status!", null));
        }


        const status = await StatusModel.findOne({
            where: {
                status_id: req.params.id
                // [Op.or]: [
                //     { student: req.params.id },
                //     { lecturer: req.params.id }
                // ],
            },

        });

        res.json(
            responsePayload(true, "Tải thông tin đề tài thành công!", status)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};



exports.create = async (req, res) => {
    try {
        const {
            file_name,
            file_url,
            file_status,
            topic_id
        } = req.body;
        // Create the new student record
        const newFile = await FileModel.create({
            file_name,
            file_url,
            file_status,
            topic_id
        });

        res.json(responsePayload(true, "Tạo lời mời thành công!", newFile));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};






