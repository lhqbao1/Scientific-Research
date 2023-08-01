const db = require("../models");
const StudentModel = db.student;
const MajorModel = db.major;
const TopicModel = db.topic;
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
        { student_name: { [Op.like]: `%${req.query.keyword}%` } },
        { class: { [Op.like]: `%${req.query.keyword}%` } },
      ];
    }
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = page * limit;

    const students = await StudentModel.findAll({
      where: query,
      limit,
      offset,
      include: [
        {
          model: MajorModel,
          as: "major", // Specify the alias for MajorModel
          attributes: ["major_id", "major_name"],
        },
        {
          model: TopicModel,
          as: "topic", // Specify the alias for TopicModel
          attributes: [
            "topic_id",
            "topic_name",
            "research_area",
            "basic_description",
          ],
        },
      ],
    });

    const total = await StudentModel.count({ where: query });
    const totalPage = Math.ceil(total / limit);

    res.json(
      responsePayload(true, "Tải danh sách sinh viên thành công!", {
        items: students,
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

exports.findById = async (req, res) => {
  try {
    if (!req.params.id)
      return res
        .status(400)
        .json(responsePayload(false, "Đường dẫn thiêu id sinh viên!", null));
    const student = await StudentModel.findOne({
      where: {
        student_id: req.params.id,
      },
      include: [
        {
          model: MajorModel,
          as: "major", // Specify the alias for MajorModel
          attributes: ["major_id", "major_name"],
        },
        {
          model: TopicModel,
          as: "topic", // Specify the alias for TopicModel
          attributes: [
            "topic_id",
            "topic_name",
            "research_area",
            "basic_description",
          ],
        },
      ],
    });
    if (!student)
      return res.json(
        responsePayload(false, "Sinh viên không tồn tại!", student)
      );
    res.json(
      responsePayload(true, "Tải thông tin sinh viên thành công!", student)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.create = async (req, res) => {
  try {
    const { user_id, student_code, email, student_name, grade, major_id, topic_id } = req.body;
    // Create the new student record
    const newStudent = await StudentModel.create({
      user_id,
      student_code,
      email,
      student_name,
      grade,
      major_id,
      topic_id,
    });

    res.json(responsePayload(true, "Tạo sinh viên thành công!", newStudent));
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.remove = async (req, res) => {
  try {
    const studentId = req.params.id;
    // Find the student by ID
    const student = await StudentModel.findOne({
      where: {
        student_id: studentId,
      },
    });

    if (!student) {
      return res.json(responsePayload(false, "Student not found!", null));
    }

    // Delete the student
    await student.destroy();

    res.json(responsePayload(true, "Xóa sinh viên thành công!", student));
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateStudent = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json(responsePayload(false, "Thiếu id người dùng!", null));
    }

    const student = await StudentModel.findOne({
      where: {
        student_id: req.params.id,
      },
    });

    if (!student) {
      return res
        .status(400)
        .json(responsePayload(false, "Người dùng không tồn tại!", null));
    }

    // Update the student record with the data from the request body
    for (const key in req.body) {
      student[key] = req.body[key];
    }

    // Save the updated student record
    await student.save();

    // Find the updated student record again to include the associated major and topic
    const updatedStudent = await StudentModel.findOne({
      where: {
        student_id: req.params.id,
      },
      include: [
        {
          model: MajorModel,
          as: "major",
          attributes: ["major_id", "major_name"],
        },
        {
          model: TopicModel,
          as: "topic",
          attributes: [
            "topic_id",
            "topic_name",
            "research_area",
            "basic_description",
          ],
        },
      ],
    });

    res.json(
      responsePayload(
        true,
        "Cập nhật thông tin người dùng thành công!",
        updatedStudent
      )
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};
