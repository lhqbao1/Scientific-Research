const db = require("../models");
const FileModel = db.file
const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findFiles = async (req, res) => {
    try {
        if (!req.params.topic_id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id topic!", null));
        }

        const file = await FileModel.findAll({
            where: {
                topic_id: req.params.topic_id
            }
        });
        if (file && file.length > 0) {
            file.map(item => {
                item.file_url = new Buffer(item.file_url, 'base64').toString('binary')
                return item
            })
        }
        res.json(
            responsePayload(true, "Tải danh sách chủ đề thành công!", {
                items: file,
                // subItem: fileUrl
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

// exports.findById = async (req, res) => {
//     try {
//         if (!req.params.id) {
//             return res
//                 .status(400)
//                 .json(responsePayload(false, "Thiếu id invitation!", null));
//         }


//         const invitation = await InvitationModel.findAll({
//             where: {
//                 status: 1,
//                 [Op.or]: [
//                     { student: req.params.id },
//                     { lecturer: req.params.id }
//                 ],


//             },
//             include: [
//                 {
//                     model: StudentModal,
//                     as: "studentInfo", // Specify the alias for MajorModel
//                     include: [
//                         {
//                             model: MajorModel,
//                             as: "major", // Specify the alias for MajorModel
//                             // attributes: ["major_id", "major_name"],
//                         },
//                         {
//                             model: TopicModel,
//                             as: "topic", // Specify the alias for TopicModel
//                         },

//                     ]
//                 },
//             ],
//         });

//         if (!invitation) {
//             return res.json(
//                 responsePayload(false, "Đề tài không tồn tại!", null)
//             );
//         }

//         res.json(
//             responsePayload(true, "Tải thông tin đề tài thành công!", invitation)
//         );
//     } catch (err) {
//         res.status(500).json(responsePayload(false, err.message, null));
//     }
// };



exports.create = async (req, res) => {
    try {
        const {
            file_name,
            file_url,
            file_status,
            topic_id
        } = req.body;
        // Create the new student record
        const newFile = await FileModel.create({
            file_name,
            file_url,
            file_status,
            topic_id
        });

        res.json(responsePayload(true, "Tạo lời mời thành công!", newFile));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};






