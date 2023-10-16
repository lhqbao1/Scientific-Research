const db = require("../models");
const InvitationAcceptanceModel = db.invitationacceptance;
const StudentModal = db.student
const MajorModel = db.major;
const TopicModel = db.topic;
const LecturerModel = db.lecturer
const FileModel = db.file
const StatusModel = db.status
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



        const invitationacceptance = await InvitationAcceptanceModel.findAll({
            where: query,

        });
        res.json(
            responsePayload(true, "Tải danh sách chủ đề thành công!", {
                items: invitationacceptance,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.getSent = async (req, res) => {
    try {
        if (!req.params.advisor) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }

        if (!req.params.topic) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }


        const invitation = await InvitationAcceptanceModel.findAll({
            where: {

                [Op.and]: [
                    { advisor: req.params.advisor },
                    { topic: req.params.topic }
                ],


            },
            include: [
                // {
                //     model: StudentModal,
                //     as: "studentInfo", // Specify the alias for MajorModel
                //     include: [
                //         {
                //             model: MajorModel,
                //             as: "major", // Specify the alias for MajorModel
                //             // attributes: ["major_id", "major_name"],
                //         },

                //     ]
                // },
                {
                    model: TopicModel,
                    as: 'topicInfo',

                    // include: [
                    //     {
                    //         model: FileModel,
                    //         as: 'file'
                    //     }
                    // ]
                },
                {
                    model: LecturerModel,
                    as: 'lecturerInfo'
                },
                {
                    model: StatusModel,
                    as: 'statusInfo'
                }

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

exports.checkInvi = async (req, res) => {
    try {
        if (!req.params.advisor) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }
        if (!req.params.lecturer) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }
        if (!req.params.topic) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }


        const invitation = await InvitationAcceptanceModel.findAll({
            where: {
                [Op.or]: [
                    {
                        status: 1
                    },
                    {
                        status: 2
                    }
                ],
                [Op.and]: [
                    { advisor: req.params.advisor },
                    { topic: req.params.topic },
                    { lecturer: req.params.lecturer }
                ],


            },
            // include: [
            //     // {
            //     //     model: StudentModal,
            //     //     as: "studentInfo", // Specify the alias for MajorModel
            //     //     include: [
            //     //         {
            //     //             model: MajorModel,
            //     //             as: "major", // Specify the alias for MajorModel
            //     //             // attributes: ["major_id", "major_name"],
            //     //         },

            //     //     ]
            //     // },
            //     {
            //         model: TopicModel,
            //         as: 'topicInfo',
            //         // include: [
            //         //     {
            //         //         model: FileModel,
            //         //         as: 'file'
            //         //     }
            //         // ]
            //     },
            //     {
            //         model: LecturerModel,
            //         as: 'lecturerInfo'
            //     }
            // ],
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

exports.checkRole = async (req, res) => {
    try {
        if (!req.params.advisor) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }
        if (!req.params.type) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }
        if (!req.params.topic) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }


        const invitation = await InvitationAcceptanceModel.findAll({
            where: {
                [Op.or]: [
                    {
                        status: 1
                    },
                    {
                        status: 2
                    }
                ],

                [Op.and]: [
                    { advisor: req.params.advisor },
                    { topic: req.params.topic },
                    { type: req.params.type }
                ],


            },
            // include: [
            //     // {
            //     //     model: StudentModal,
            //     //     as: "studentInfo", // Specify the alias for MajorModel
            //     //     include: [
            //     //         {
            //     //             model: MajorModel,
            //     //             as: "major", // Specify the alias for MajorModel
            //     //             // attributes: ["major_id", "major_name"],
            //     //         },

            //     //     ]
            //     // },
            //     {
            //         model: TopicModel,
            //         as: 'topicInfo',
            //         // include: [
            //         //     {
            //         //         model: FileModel,
            //         //         as: 'file'
            //         //     }
            //         // ]
            //     },
            //     {
            //         model: LecturerModel,
            //         as: 'lecturerInfo'
            //     }
            // ],
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

exports.checkRecieveInvi = async (req, res) => {
    try {
        if (!req.params.lecturer) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }

        const invitation = await InvitationAcceptanceModel.findAll({
            where: {
                [Op.and]: [
                    { status: 1 },

                    { lecturer: req.params.lecturer },
                ],


            },
            include: [
                {
                    model: TopicModel,
                    as: 'topicInfo',
                    include: [
                        {
                            model: FileModel,
                            as: 'file'
                        },
                        {
                            model: StudentModal,
                            as: 'student'
                        }
                    ]
                },
                {
                    model: LecturerModel,
                    as: 'lecturerInfo'
                },
                {
                    model: LecturerModel,
                    as: 'advisorInfo'
                }
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



exports.getRefusedInvitation = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id invitation!", null));
        }


        const invitation = await InvitationModel.findAll({
            where: {
                status: 14,
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

                    ]
                },
                {
                    model: TopicModel,
                    as: 'topicInfo',
                    // include: [
                    //     {
                    //         model: FileModel,
                    //         as: 'file'
                    //     }
                    // ]
                },
                {
                    model: LecturerModel,
                    as: 'lecturerInfo'
                }
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
            // include: [
            //     {
            //         model: StudentModal,
            //         as: "studentInfo", // Specify the alias for MajorModel
            //         include: [
            //             {
            //                 model: MajorModel,
            //                 as: "major", // Specify the alias for MajorModel
            //                 // attributes: ["major_id", "major_name"],
            //             },
            //             {
            //                 model: TopicModel,
            //                 as: "topic", // Specify the alias for TopicModel
            //             },

            //         ]
            //     },
            //     // {
            //     //     model: LecturerModel,
            //     //     as: 'lecturerInfo'
            //     // }
            // ],
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
            advisor,
            lecturer,
            topic,
            type
        } = req.body;
        // Create the new student record
        const newInvitation = await InvitationAcceptanceModel.create({
            advisor,
            lecturer,
            topic,
            type
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

        const invitationacceptance = await InvitationAcceptanceModel.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!invitationacceptance) {
            return res
                .status(400)
                .json(responsePayload(false, "Lời mời không tồn tại!", null));
        }

        // Update the lecturer record with the data from the request body
        invitationacceptance.set(req.body);

        // Save the updated lecturer record
        await invitationacceptance.save();

        res.json(
            responsePayload(
                true,
                "Cập nhật thông tin lời mời thành công!",
                invitationacceptance
            )
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};




