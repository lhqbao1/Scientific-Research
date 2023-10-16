const db = require("../models");
const ExplanationModel = db.explanation
const LecturerModel = db.lecturer
const CommissionerModel = db.commissioner
const CounterModel = db.counter

const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {


        const explanation = await ExplanationModel.findAll({
            where: {
                type: 'hội đồng thuyết minh'
            },
            include: [
                {
                    model: CommissionerModel,
                    as: 'commissioners',
                    include: [
                        {
                            model: LecturerModel,
                            as: 'lecturerInfo'
                        }
                    ]
                },
                {
                    model: LecturerModel,
                    as: "presidentInfo" // Specify the alias
                    // attributes: ["workplace_name"],
                },
                {
                    model: LecturerModel,
                    as: "secretaryInfo" // Specify the alias
                    // attributes: ["workplace_name"],
                },
            ],
        });

        res.json(
            responsePayload(true, "Tải danh sách hội đồng thành công!", {
                items: explanation,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findAllAcc = async (req, res) => {
    try {


        const explanation = await ExplanationModel.findAll({
            where: {
                type: 'hội đồng nghiệm thu'
            },
            include: [
                {
                    model: CommissionerModel,
                    as: 'commissioners',
                    include: [
                        {
                            model: LecturerModel,
                            as: 'lecturerInfo'
                        }
                    ]
                },
                {
                    model: CounterModel,
                    as: 'counter',
                    include: [
                        {
                            model: LecturerModel,
                            as: 'lecturerInfo'
                        }
                    ]
                },
                {
                    model: LecturerModel,
                    as: "presidentInfo" // Specify the alias
                    // attributes: ["workplace_name"],
                },
                {
                    model: LecturerModel,
                    as: "secretaryInfo" // Specify the alias
                    // attributes: ["workplace_name"],
                },

            ],
        });
        console.log('check data', explanation)

        res.json(
            responsePayload(true, "Tải danh sách hội đồng thành công!", {
                items: explanation,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findById = async (req, res) => {
    try {
        const explanation = await ExplanationModel.findOne({
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: LecturerModel,
                    as: "presidentInfo" // Specify the alias
                    // attributes: ["workplace_name"],
                },
                {
                    model: LecturerModel,
                    as: "secretaryInfo" // Specify the alias
                    // attributes: ["workplace_name"],
                },

                {
                    model: CommissionerModel,
                    as: 'commissioners',
                    include: [
                        {
                            model: LecturerModel,
                            as: 'lecturerInfo'
                        }
                    ]
                },
                {
                    model: CounterModel,
                    as: 'counter',
                    include: [
                        {
                            model: LecturerModel,
                            as: 'lecturerInfo'
                        }
                    ]
                },

            ],
        });

        res.json(
            responsePayload(true, "Tải danh sách hội đồng thành công!", {
                items: explanation,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {
        const {
            name,
            phase,
            type
        } = req.body;
        // Create the new student record
        const newCoucil = await ExplanationModel.create({
            name,
            phase,
            type
        });

        res.json(responsePayload(true, "Tạo lời mời thành công!", newCoucil));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.updateBoard = async (req, res) => {
    try {
        if (!req.params.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id lời mời!", null));
        }

        const board = await ExplanationModel.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!board) {
            return res
                .status(400)
                .json(responsePayload(false, "Lời mời không tồn tại!", null));
        }

        // Update the lecturer record with the data from the request body
        board.set(req.body);

        // Save the updated lecturer record
        await board.save();

        res.json(
            responsePayload(
                true,
                "Cập nhật thông tin lời mời thành công!",
                board
            )
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};












