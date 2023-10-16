const db = require("../models");
const MajorModel = db.major;


const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {


        const major = await MajorModel.findAll({
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













