const db = require("../models");
const LecturerModel = db.lecturer;
const WorkplaceModel = db.workplace;
const ExplanationModel = db.explanation
const TopicModel = db.topic
const FileModel = db.file
const StudentModel = db.student
const StatusModel = db.status
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
    let query = {};
    if (req.query.status) query.status = req.query.status;
    if (req.query.keyword) {
      query[Op.or] = [
        { lecturer_name: { [Op.like]: `%${req.query.keyword}%` } },
        { position: { [Op.like]: `%${req.query.keyword}%` } },
      ];
    }
    const page = req.query.page ? parseInt(req.query.page) - 1 : 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = page * limit;

    const lecturers = await LecturerModel.findAll({
      where: query,
      limit,
      offset,
      include: [
        {
          model: WorkplaceModel,
          as: 'workplace'
        },
        // {
        //   model: TopicModel,
        //   as: 'topic'
        // }
      ]
      // Include options for related models if needed
    });

    const total = await LecturerModel.count({ where: query });
    const totalPage = Math.ceil(total / limit);

    res.json(
      responsePayload(true, "Tải danh sách giảng viên thành công!", {
        items: lecturers,
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

exports.findByWorkPlace = async (req, res) => {
  try {
    const { work_place_id } = req.params;

    if (!work_place_id)
      return res
        .status(400)
        .json(responsePayload(false, "Đường dẫn thiếu work_place_id!", null));

    const lecturers = await LecturerModel.findAll({
      where: {
        work_place_id: work_place_id,
      },
      include: [
        {
          model: WorkplaceModel,
          as: "workplace", // Specify the alias
          attributes: ["workplace_name"],
        },
      ],
    });

    if (!lecturers || lecturers.length === 0)
      return res.json(
        responsePayload(
          false,
          "Không có giảng viên thuộc work_place này!",
          null
        )
      );

    res.json(
      responsePayload(true, "Tải danh sách giảng viên thành công!", lecturers)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.findByCoucil = async (req, res) => {
  try {
    // const { explanationboard } = req.params;

    // if (!explanationboard)
    //   return res
    //     .status(400)
    //     .json(responsePayload(false, "Đường dẫn thiếu explanationboard!", null));

    const lecturers = await LecturerModel.findAll({
      // where: {
      //   explanationboard,
      // },
      include: [
        {
          model: WorkplaceModel,
          as: "workplace", // Specify the alias
          attributes: ["workplace_name"],
        },
        // {
        //   model: ExplanationModel,
        //   as: 'coucil'
        // }
      ],
    });

    if (!lecturers || lecturers.length === 0)
      return res.json(
        responsePayload(
          false,
          "Không có giảng viên thuộc hội đồng này!",
          null
        )
      );

    res.json(
      responsePayload(true, "Tải danh sách giảng viên thành công!", lecturers)
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
        .json(responsePayload(false, "Thiếu id người dùng!", null));
    }

    const lecturer = await LecturerModel.findOne({
      where: {
        [Op.or]: [
          // { user_id: req.params.id },
          { lecturer_id: req.params.id }
        ],
      },



      include: [
        {
          model: ExplanationModel,
          as: 'presidentInfo',
          include: [
            {
              model: TopicModel,
              as: 'topicInfo',
              include: [
                {
                  model: FileModel,
                  as: 'file'
                },
                {
                  model: StudentModel,
                  as: 'student'
                },
                {
                  model: StatusModel,
                  as: 'status'
                },
                {
                  model: LecturerModel,
                  as: 'lecturerInfo'
                },
              ]
            }
          ]
        },
        {
          model: ExplanationModel,
          as: 'secretaryInfo',
          include: [
            {
              model: TopicModel,
              as: 'topicInfo',
              include: [
                {
                  model: FileModel,
                  as: 'file'
                },
                {
                  model: StudentModel,
                  as: 'student'
                },
                {
                  model: StatusModel,
                  as: 'status'
                },
                {
                  model: LecturerModel,
                  as: 'lecturerInfo'
                },
              ]
            }
          ]
        },
      ]

    });
    const commissioner = await CommissionerModel.findAll({
      where: {
        lecturer: req.params.id
      },
      include: [
        {
          model: ExplanationModel,
          as: 'boardInfo',
          attributes: ["id"],
          include: [
            {
              model: TopicModel,
              as: 'topicInfo',
              include: [
                {
                  model: FileModel,
                  as: 'file'
                },
                {
                  model: StudentModel,
                  as: 'student'
                },
                {
                  model: StatusModel,
                  as: 'status'
                },
                {
                  model: LecturerModel,
                  as: 'lecturerInfo'
                },
              ]
            }
          ]
        }
      ]
    })

    if (!lecturer) {
      return res.json(
        responsePayload(false, "Người dùng không tồn tại!", null)
      );
    }

    res.json(
      responsePayload(true, "Tải danh sách giảng viên thành công!", {
        lecturer,
        commissioner
      })
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
        .json(responsePayload(false, "Thiếu id người dùng!", null));
    }

    const lecturer = await LecturerModel.findOne({
      where: {
        // { user_id: req.params.id },
        lecturer_id: req.params.id

      },

      include: [
        {
          model: ExplanationModel,
          as: 'presidentInfo',
          include: [
            {
              model: TopicModel,
              as: 'topicAccInfo',
              include: [
                {
                  model: FileModel,
                  as: 'file'
                },
                {
                  model: StudentModel,
                  as: 'student'
                },
                {
                  model: StatusModel,
                  as: 'status'
                },
                {
                  model: LecturerModel,
                  as: 'lecturerInfo'
                },
              ]
            }
          ]
        },
        {
          model: ExplanationModel,
          as: 'secretaryInfo',
          include: [
            {
              model: TopicModel,
              as: 'topicAccInfo',
              include: [
                {
                  model: FileModel,
                  as: 'file'
                },
                {
                  model: StudentModel,
                  as: 'student'
                },
                {
                  model: StatusModel,
                  as: 'status'
                },
                {
                  model: LecturerModel,
                  as: 'lecturerInfo'
                },
              ]
            }
          ]
        },
      ]
    });

    const commissioner = await CommissionerModel.findAll({
      where: {
        lecturer: req.params.id
      },
      include: [
        {
          model: ExplanationModel,
          as: 'boardInfo',
          // attributes: ["id"],
          include: [
            {
              model: TopicModel,
              as: 'topicAccInfo',
              include: [
                {
                  model: FileModel,
                  as: 'file'
                },
                {
                  model: StudentModel,
                  as: 'student'
                },
                {
                  model: StatusModel,
                  as: 'status'
                },
                {
                  model: LecturerModel,
                  as: 'lecturerInfo'
                },
              ]
            }
          ]
        }
      ]
    })

    const counter = await CounterModel.findAll({
      where: {
        lecturer: req.params.id
      },
      include: [
        {
          model: ExplanationModel,
          as: 'boardInfo',
          // attributes: ["id"],
          include: [
            {
              model: TopicModel,
              as: 'topicAccInfo',
              include: [
                {
                  model: FileModel,
                  as: 'file'
                },
                {
                  model: StudentModel,
                  as: 'student'
                },
                {
                  model: StatusModel,
                  as: 'status'
                },
                {
                  model: LecturerModel,
                  as: 'lecturerInfo'
                },
              ]
            }
          ]
        }
      ]
    })

    if (!lecturer) {
      return res.json(
        responsePayload(false, "Người dùng không tồn tại!", null)
      );
    }

    res.json(
      responsePayload(true, "Tải danh sách giảng viên thành công!", {
        lecturer,
        commissioner,
        counter
      })
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.findByIdLogin = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json(responsePayload(false, "Thiếu id người dùng!", null));
    }

    const lecturer = await LecturerModel.findOne({
      where: {
        [Op.or]: [
          { user_id: req.params.id },
          // { lecturer_id: req.params.id }
        ],
      },



    });

    if (!lecturer) {
      return res.json(
        responsePayload(false, "Người dùng không tồn tại!", null)
      );
    }

    res.json(
      responsePayload(true, "Tải thông tin người dùng thành công!", lecturer)
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};


exports.create = async (req, res) => {
  try {
    const { user_id, lecturer_name, position, degree, email, work_place_id, topic_id } =
      req.body;

    // Create the new lecturer record
    const newLecturer = await LecturerModel.create({
      user_id,
      lecturer_name,
      position,
      degree,
      email,
      work_place_id, // Use work_place_id instead of work_place
      topic_id,
    });

    res.json(responsePayload(true, "Tạo giảng viên thành công!", newLecturer));
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.remove = async (req, res) => {
  try {
    const lecturerId = req.params.id;

    // Find the lecturer by ID
    const lecturer = await LecturerModel.findOne({
      where: {
        lecturer_id: lecturerId,
      },
    });

    if (!lecturer) {
      return res.json(responsePayload(false, "Lecturer not found!", null));
    }

    // Delete the lecturer
    await lecturer.destroy();

    res.json(responsePayload(true, "Xóa giảng viên thành công!", lecturer));
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};

exports.updateLecturer = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .json(responsePayload(false, "Thiếu id giảng viên!", null));
    }

    const lecturer = await LecturerModel.findOne({
      where: {
        lecturer_id: req.params.id,
      },
    });

    if (!lecturer) {
      return res
        .status(400)
        .json(responsePayload(false, "Giảng viên không tồn tại!", null));
    }

    // Update the lecturer record with the data from the request body
    lecturer.set(req.body);

    // Save the updated lecturer record
    await lecturer.save();

    res.json(
      responsePayload(
        true,
        "Cập nhật thông tin giảng viên thành công!",
        lecturer
      )
    );
  } catch (err) {
    res.status(500).json(responsePayload(false, err.message, null));
  }
};
