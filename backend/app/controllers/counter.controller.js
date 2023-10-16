const db = require("../models");
const CounterModel = db.counter;


const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.getAll = async (req, res) => {
    try {


        const counter = await CounterModel.findAll({
        });
        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: counter,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {
        const { lecturer, board } = req.body
        const counter = await CounterModel.create({
            lecturer,
            board
        })
        res.json(responsePayload(true, "Tạo lời mời thành công!", counter));

    } catch (error) {
        res.status(500).json(responsePayload(false, error.message, null))
    }
}













