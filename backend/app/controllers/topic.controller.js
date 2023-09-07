const db = require("../models");
const TopicModel = db.topic;
const { Op } = require("sequelize");
const StatusModel = db.status
const StudentModel = db.student

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
        { topic_name: { [Op.like]: `%${req.query.keyword}%` } },
        { research_area: { [Op.like]: `%${req.query.keyword}%` } },
      ];
    }
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = page * limit;

    const topics = await TopicModel.findAll({
      where: query,
      limit,
      offset,
    });

    const total = await TopicModel.count({ where: query });
    const totalPage = Math.ceil(total / limit);

    res.json(
      responsePayload(true, "Tải danh sách chủ đề thành công!", {
        items: topics,
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

exports.create = async (req, res) => {
  try {
    const { topic_name, research_area, basic_description } = req.body;

    // Create the new topic record
    const newTopic = await TopicModel.create({
      topic_name,
      research_area,
      basic_description,
    });

    res.json(responsePayload(true, "Tạo chủ đề thành công!", newTopic));
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.remove = async (req, res) => {
  try {
    const topicId = req.params.id;

    // Find the topic by ID
    const topic = await TopicModel.findOne({
      where: {
        topic_id: topicId,
      },
    });

    if (!topic) {
      return res.json(responsePayload(false, "Topic not found!", null));
    }

    // Delete the topic
    await topic.destroy();

    res.json(responsePayload(true, "Xóa chủ đề thành công!", topic));
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateTopic = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json(responsePayload(false, "Thiếu id chủ đề!", null));
    }

    const topic = await TopicModel.findOne({
      where: {
        topic_id: req.params.id,
      },
    });

    if (!topic) {
      return res
        .status(400)
        .json(responsePayload(false, "Chủ đề không tồn tại!", null));
    }

    // Update the topic record with the data from the request body
    topic.set(req.body);

    // Save the updated topic record
    await topic.save();

    res.json(
      responsePayload(true, "Cập nhật thông tin chủ đề thành công!", topic)
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
        .json(responsePayload(false, "Thiếu id topic!", null));
    }

    const topic = await TopicModel.findOne({
      where: {
        topic_id: req.params.id,
      },
      include: [
        {
          model: StatusModel,
          as: "status", // Specify the alias for MajorModel
          // attributes: ["status"],
        },

      ],
    });

    if (!topic) {
      return res.json(
        responsePayload(false, "Đề tài không tồn tại!", null)
      );
    }

    res.json(
      responsePayload(true, "Tải thông tin đề tài thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.findWithStudent = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json(responsePayload(false, "Thiếu id topic!", null));
    }

    const topic = await TopicModel.findAll({
      where: {
        lecturer_id: req.params.id,
      },
      include: [
        {
          model: StatusModel,
          as: "status", // Specify the alias for MajorModel
          // attributes: ["status"],
        },
        {
          model: StudentModel,
          as: 'student'
        }

      ],
    });

    if (!topic) {
      return res.json(
        responsePayload(false, "Đề tài không tồn tại!", null)
      );
    }

    res.json(
      responsePayload(true, "Tải thông tin đề tài thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};