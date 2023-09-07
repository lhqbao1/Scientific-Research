const db = require("../models");
const ExplanationModel = db.explanation
const LecturerModel = db.lecturer
const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {


        const explanation = await ExplanationModel.findAll({
            include: [
                {
                    model: LecturerModel,
                    as: "lecturer", // Specify the alias
                    // attributes: ["workplace_name"],
                },
                // {
                //   model: ExplanationModel,
                //   as: 'coucil'
                // }
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
            phase
        } = req.body;
        // Create the new student record
        const newCoucil = await ExplanationModel.create({
            name,
            phase
        });

        res.json(responsePayload(true, "Tạo lời mời thành công!", newCoucil));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};











