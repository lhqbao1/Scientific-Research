const db = require("../models");
const TopicModel = db.topic;
const { Op, where } = require("sequelize");
const StatusModel = db.status
const StudentModel = db.student
const FileModel = db.file
const MajorModel = db.major
const LecturerModel = db.lecturer
const ExplanationModel = db.explanation
const CommissionerModel = db.commissioner
const CounterModel = db.counter
responsePayload = (status, message, payload) => ({
  status,
  message,
  payload,
});

exports.findAll = async (req, res) => {
  try {
    let query = {};
    // if (req.query.status) {
    //   query.status = req.query.status
    // }
    // let status = req.body.status
    if (req.query.keyword) {
      query[Op.or] = [
        // { topic_name: { [Op.like]: `%${req.query.keyword}%` } },
        // { research_area: { [Op.like]: `%${req.query.keyword}%` } },
        { topic_status: req.query.keyword },

      ];
    }
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = page * limit;

    const topics = await TopicModel.findAll({
      where: query,
      limit,
      offset,
      include: [
        {
          model: StatusModel,
          as: 'status'
        },
        {
          model: LecturerModel,
          as: 'lecturer'
        },
        {
          model: StudentModel,
          as: 'student'
        },
        {
          model: FileModel,
          as: 'file'
        },
        {
          model: ExplanationModel,
          as: 'accBoard',
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
          ]
        },


      ]
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

exports.findSetExplanation = async (req, res) => {
  try {
    // let query = {};
    // if (req.query.status) query.status = req.query.status;
    // if (req.query.keyword) {
    //   query[Op.or] = [
    //     { topic_name: { [Op.like]: `%${req.query.keyword}%` } },
    //   ];
    // }
    // const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
    // const limit = parseInt(req.query.limit) || 1000;
    // const offset = page * limit;

    const topics = await TopicModel.findAll({
      where: {
        topic_status: 5
      },
      // limit,
      // offset,
      include: [
        {
          model: StatusModel,
          as: 'status'
        },
        {
          model: LecturerModel,
          as: 'lecturer'
        },
        {
          model: StudentModel,
          as: 'student'
        }
      ]
    });

    // const total = await TopicModel.count({ where: query });
    // const totalPage = Math.ceil(total / limit);

    res.json(
      responsePayload(true, "Tải danh sách chủ đề thành công!", {
        items: topics,
        // meta: {
        //   currentPage: page + 1,
        //   limit,
        //   totalItems: total,
        //   totalPage,
        // },
      })
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};



exports.create = async (req, res) => {
  try {
    const { topic_name, research_area, basic_description, topic_status, duration, phase } = req.body;

    // Create the new topic record
    const newTopic = await TopicModel.create({
      topic_name,
      research_area,
      basic_description,
      topic_status,
      duration,
      phase
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

exports.updateBulkTopic = async (req, res) => {
  try {

    let id = req.body.idArr
    console.log(id.length)
    let board = req.body.board

    const topic = await TopicModel.update(
      { explanationboard: board },
      {
        where: {
          topic_id: id,
        },
      });

    if (!topic) {
      return res
        .status(400)
        .json(responsePayload(false, "Chủ đề không tồn tại!", null));
    }
    res.json(
      responsePayload(true, "Cập nhật thông tin chủ đề thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateBulkTopicStatus = async (req, res) => {
  try {

    let id = req.body.idArr
    // console.log(id.length)
    // let board = req.body.board

    const topic = await TopicModel.update(
      { topic_status: 15 },
      {
        where: {
          topic_id: id,
        },
      });

    if (!topic) {
      return res
        .status(400)
        .json(responsePayload(false, "Chủ đề không tồn tại!", null));
    }
    res.json(
      responsePayload(true, "Cập nhật thông tin chủ đề thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateBulkTopicStatus7 = async (req, res) => {
  try {

    let id = req.body.idArr
    // console.log(id.length)
    // let board = req.body.board

    const topic = await TopicModel.update(
      { topic_status: 7 },
      {
        where: {
          topic_id: id,
        },
      });

    if (!topic) {
      return res
        .status(400)
        .json(responsePayload(false, "Chủ đề không tồn tại!", null));
    }
    res.json(
      responsePayload(true, "Cập nhật thông tin chủ đề thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateBulkTopicStatusTrue = async (req, res) => {
  try {

    let id = req.body.idArr
    let status = req.body.status
    // console.log(id.length)
    // let board = req.body.board

    const topic = await TopicModel.update(
      { topic_status: status },
      {
        where: {
          topic_id: id,
        },
      });

    if (!topic) {
      return res
        .status(400)
        .json(responsePayload(false, "Chủ đề không tồn tại!", null));
    }
    res.json(
      responsePayload(true, "Cập nhật thông tin chủ đề thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateBulkTopicApprove = async (req, res) => {
  try {

    let id = req.body.idArr
    let cost = req.body.cost
    let code = req.body.code

    console.log('check id', id.length)
    console.log('check cost', cost)
    console.log('check code', code.length)

    // console.log(id.length)
    // let board = req.body.board

    const statements = [];
    // const tableName = "topics";

    for (let i = 0; i < id.length; i++) {
      statements.push(
        TopicModel.update(
          {
            cost: 1500000,
            topic_code: code[i]
          },
          // { cost: cost },

          {
            where: {
              topic_id: id[i]
            }
          }
        )

      );
    }


    const topic = await Promise.all(statements);
    // const topic = await TopicModel.update(
    //   { cost: cost },
    //   { topic_code: code },
    //   {
    //     where: {
    //       topic_id: id,
    //     },
    //   });

    if (!topic) {
      return res
        .status(400)
        .json(responsePayload(false, "Chủ đề không tồn tại!", null));
    }
    res.json(
      responsePayload(true, "Cập nhật thông tin chủ đề thành công!", topic)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateTopicAcc = async (req, res) => {
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
        {
          model: StudentModel,
          as: 'student'
        },
        {
          model: ExplanationModel,
          as: 'board',
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
          ]
        },
        {
          model: ExplanationModel,
          as: 'accBoard',
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
          ]
        },
        {
          model: LecturerModel,
          as: 'lecturerInfo'
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

exports.findByIdAcc = async (req, res) => {
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
        {
          model: StudentModel,
          as: 'student'
        },
        {
          model: ExplanationModel,
          as: 'board',
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


          ]
        },
        {
          model: ExplanationModel,
          as: 'accBoard',
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
              model: LecturerModel,
              as: "couterInfo" // Specify the alias
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

          ]
        },
        {
          model: LecturerModel,
          as: 'lecturerInfo'
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
          as: 'student',
          include: [
            {
              model: MajorModel,
              as: 'major'
            }
          ]
        },
        {
          model: FileModel,
          as: 'file'
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

exports.findWithExplanation = async (req, res) => {
  try {

    if (!req.params.explanationid) {
      return res
        .status(400)
        .json(responsePayload(false, "Thiếu id explanation!", null));
    }

    const topic = await TopicModel.findAll({
      where: {
        explanationboard: req.params.explanationid
      },
      include: [
        {
          model: StatusModel,
          as: "status", // Specify the alias for MajorModel
          // attributes: ["status"],
        },
        {
          model: StudentModel,
          as: 'student',
          include: [
            {
              model: MajorModel,
              as: 'major'
            }
          ]
        },
        {
          model: FileModel,
          as: 'file'
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