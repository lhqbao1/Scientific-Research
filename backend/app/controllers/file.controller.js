const db = require("../models");
const FileModel = db.file
const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findFiles = async (req, res) => {
    try {
        if (!req.params.topic_id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id topic!", null));
        }

        const file = await FileModel.findAll({
            where: {
                topic_id: req.params.topic_id,
                file_type: 'explanation'
            }
        });
        if (file && file.length > 0) {
            file.map(item => {
                item.file_url = new Buffer(item.file_url, 'base64').toString('binary')
                return item
            })
        }
        res.json(
            responsePayload(true, "Tải danh sách chủ đề thành công!", {
                items: file,
                // subItem: fileUrl
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findAcceptanceFiles = async (req, res) => {
    try {
        if (!req.params.topic_id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id topic!", null));
        }

        const file = await FileModel.findAll({
            where: {
                topic_id: req.params.topic_id,
                file_type: 'acceptance'
            }
        });
        if (file && file.length > 0) {
            file.map(item => {
                item.file_url = new Buffer(item.file_url, 'base64').toString('binary')
                return item
            })
        }
        res.json(
            responsePayload(true, "Tải danh sách chủ đề thành công!", {
                items: file,
                // subItem: fileUrl
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findLetterFiles = async (req, res) => {
    try {
        if (!req.params.topic_id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id topic!", null));
        }

        const file = await FileModel.findAll({
            where: {
                topic_id: req.params.topic_id,
                file_type: 'letter'
            }
        });
        if (file && file.length > 0) {
            file.map(item => {
                item.file_url = new Buffer(item.file_url, 'base64').toString('binary')
                return item
            })
        }
        res.json(
            responsePayload(true, "Tải danh sách chủ đề thành công!", {
                items: file,
                // subItem: fileUrl
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findEditExplanationFiles = async (req, res) => {
    try {
        if (!req.params.topic_id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id topic!", null));
        }

        const file = await FileModel.findAll({
            where: {
                topic_id: req.params.topic_id,
                file_type: 'edit explanation'
            }
        });
        if (file && file.length > 0) {
            file.map(item => {
                item.file_url = new Buffer(item.file_url, 'base64').toString('binary')
                return item
            })
        }
        res.json(
            responsePayload(true, "Tải danh sách chủ đề thành công!", {
                items: file,
                // subItem: fileUrl
            })
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
            file_type,
            topic_id
        } = req.body;
        // Create the new student record
        const newFile = await FileModel.create({
            file_name,
            file_url,
            file_type,
            topic_id
        });

        res.json(responsePayload(true, "Tạo lời mời thành công!", newFile));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.createBulk = async (req, res) => {
    try {

        // Create the new student record
        const newFile = await FileModel.bulkCreate(req.body);

        res.json(responsePayload(true, "Tạo lời mời thành công!", newFile));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.updateFile = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id giảng viên!", null));
        }

        const file = await FileModel.findOne({
            where: {
                file_id: req.params.id,
            },
        });

        if (!file) {
            return res
                .status(400)
                .json(responsePayload(false, "Giảng viên không tồn tại!", null));
        }

        // Update the lecturer record with the data from the request body
        file.set(req.body);

        // Save the updated lecturer record
        await file.save();

        res.json(
            responsePayload(
                true,
                "Cập nhật thông tin giảng viên thành công!",
                file
            )
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};





