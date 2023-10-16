const db = require("../models");
const EditexplanationModel = db.editexplanation;
const TopicModel = db.topic

const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.getAll = async (req, res) => {
    try {


        const editexplanation = await EditexplanationModel.findAll({
        });
        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", editexplanation)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.getWithTopicId = async (req, res) => {
    try {
        const topic_id = req.params.id
        const topic = await TopicModel.findOne({
            where: {
                topic_id: topic_id
            }
        })
        if (!topic) {
            res.status(500).json(responsePayload(false, 'Đề tài không tồn tại', null));
        } else {
            const editexplanation = await EditexplanationModel.findOne({
                where: {
                    topic: topic_id
                }
            });
            if (!editexplanation) {
                res.status(500).json(responsePayload(false, 'Chưa có chỉnh sửa sau thuyết minh từ chủ nhiệm đề tài', null));
            } else {
                res.json(
                    responsePayload(true, "Tải danh sách giảng viên thành công!", editexplanation)
                );
            }
        }
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {

        const editexplanation = await EditexplanationModel.create(req.body)
        res.json(responsePayload(true, "Tạo lời mời thành công!", editexplanation));

    } catch (error) {
        res.status(500).json(responsePayload(false, error.message, null))
    }
}













