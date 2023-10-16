const db = require("../models");
const CommissionerModel = db.commissioner;


const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.getAll = async (req, res) => {
    try {


        const commissioner = await CommissionerModel.findAll({
        });
        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: major,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {
        const { lecturer, board } = req.body
        const commissioner = await CommissionerModel.create({
            lecturer,
            board
        })
        res.json(responsePayload(true, "Tạo lời mời thành công!", commissioner));

    } catch (error) {
        res.status(500).json(responsePayload(false, error.message, null))
    }
}













