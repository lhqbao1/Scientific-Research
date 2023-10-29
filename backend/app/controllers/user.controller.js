const db = require("../models");
const User = db.user;
const Role = db.role;
const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
  status,
  message,
  payload,
});

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Role,
          as: 'roleInfo'
        }
      ],

    });
    res.json(
      responsePayload(true, "Tải danh sách người dùng thành công!", {
        items: users,

      })
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.findById = async (req, res) => {
  try {
    if (!req.params.id)
      return res
        .status(400)
        .json(responsePayload(false, "Đường dẫn thiêú id người dùng!", null));
    const user = await User.findOne({
      where: {
        [Op.and]: [{ status: "active", id: req.params.id }],
      },
      include: [

        { model: Role },
      ],
    });
    if (!user)
      return res.json(
        responsePayload(false, "Người dùng không tồn tại!", user)
      );
    res.json(
      responsePayload(true, "Tải thông tin người dùng thành công!", user)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    // Find the student by ID
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.json(responsePayload(false, "Student not found!", null));
    }

    await user.destroy();

    res.json(responsePayload(true, "Xóa sinh viên thành công!", user));
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

