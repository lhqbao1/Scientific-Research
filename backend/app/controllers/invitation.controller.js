const db = require("../models");
const InvitationModel = db.invitation;
const StudentModal = db.student
const MajorModel = db.major;
const TopicModel = db.topic;
const LecturerModel = db.lecturer
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
                { topic: { [Op.like]: `%${req.query.keyword}%` } },
            ];
        }



        const invitaion = await InvitationModel.findAll({
            where: query,

        });



        res.json(
            responsePayload(true, "Tải danh sách chủ đề thành công!", {
                items: invitaion,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findById = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }


        const invitation = await InvitationModel.findAll({
            where: {
                status: 1,
                [Op.or]: [
                    { student: req.params.id },
                    { lecturer: req.params.id }
                ],


            },
            include: [
                {
                    model: StudentModal,
                    as: "studentInfo", // Specify the alias for MajorModel
                    include: [
                        {
                            model: MajorModel,
                            as: "major", // Specify the alias for MajorModel
                            // attributes: ["major_id", "major_name"],
                        },
                        {
                            model: TopicModel,
                            as: "topic", // Specify the alias for TopicModel
                        },

                    ]
                },
            ],
        });

        if (!invitation) {
            return res.json(
                responsePayload(false, "Đề tài không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải thông tin đề tài thành công!", invitation)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};



exports.getAcceptedInvitation = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }


        const invitation = await InvitationModel.findOne({
            where: {
                status: 2,
                [Op.or]: [
                    { student: req.params.id },
                    // { lecturer: req.params.id }
                ],


            },
            include: [
                {
                    model: StudentModal,
                    as: "studentInfo", // Specify the alias for MajorModel
                    include: [
                        {
                            model: MajorModel,
                            as: "major", // Specify the alias for MajorModel
                            // attributes: ["major_id", "major_name"],
                        },
                        {
                            model: TopicModel,
                            as: "topic", // Specify the alias for TopicModel
                        },

                    ]
                },
                // {
                //     model: LecturerModel,
                //     as: 'lecturerInfo'
                // }
            ],
        });

        if (!invitation) {
            return res.json(
                responsePayload(false, "Đề tài không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải thông tin đề tài thành công!", invitation)
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
            topic,
        } = req.body;
        // Create the new student record
        const newInvitation = await InvitationModel.create({
            student,
            lecturer,
            topic
        });

        res.json(responsePayload(true, "Tạo lời mời thành công!", newInvitation));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.updateInvitation = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id lời mời!", null));
        }

        const invitation = await InvitationModel.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!invitation) {
            return res
                .status(400)
                .json(responsePayload(false, "Lời mời không tồn tại!", null));
        }

        // Update the lecturer record with the data from the request body
        invitation.set(req.body);

        // Save the updated lecturer record
        await invitation.save();

        res.json(
            responsePayload(
                true,
                "Cập nhật thông tin lời mời thành công!",
                invitation
            )
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};




