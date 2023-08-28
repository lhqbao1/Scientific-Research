const db = require("../models");
const InvitationModel = db.invitation;
// const MajorModel = db.major;
// const TopicModel = db.topic;
const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {
        let query = {};
        if (req.query.status) query.status = req.query.status;
        if (req.query.keyword) {
            query[Op.or] = [
                { student: { [Op.like]: `%${req.query.keyword}%` } },
                { lecturer: { [Op.like]: `%${req.query.keyword}%` } },
            ];
        }
        const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
        const limit = parseInt(req.query.limit) || 10;
        const offset = page * limit;

        const invitaion = await InvitationModel.findAll({
            where: query,
            limit,
            offset,
        });

        const total = await InvitationModel.count({ where: query });
        const totalPage = Math.ceil(total / limit);

        res.json(
            responsePayload(true, "Tải danh sách chủ đề thành công!", {
                items: invitaion,
                meta: {
                    currentPage: page + 1,
                    limit,
                    totalItems: total,
                    totalPage,
                },
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};



exports.create = async (req, res) => {
    try {
        const {
            student,
            lecturer,
        } = req.body;
        // Create the new student record
        const newInvitation = await InvitationModel.create({
            student,
            lecturer
        });

        res.json(responsePayload(true, "Tạo lời mời thành công!", newInvitation));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};




