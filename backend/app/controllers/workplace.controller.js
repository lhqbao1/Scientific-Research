const db = require("../models");
const WorkplaceModel = db.workplace;


const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {


        const workplace = await WorkplaceModel.findAll({
        });



        res.json(
            responsePayload(true, "Tải danh sách giảng viên thành công!", {
                items: workplace,

            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};













