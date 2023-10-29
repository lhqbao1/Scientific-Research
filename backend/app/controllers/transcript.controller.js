const db = require("../models");
const LecturerModel = db.lecturer
const TopicModel = db.topic
const TranscriptModel = db.transcript
const TranscriptCommentModel = db.transcriptcomment
const TranscriptScoreModel = db.transcriptscore
const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});

exports.findAll = async (req, res) => {
    try {
        const transcript = await TranscriptModel.findAll({
            // include: [
            //     {
            //         model: LecturerModel,
            //         as: "lecturer", // Specify the alias
            //         // attributes: ["workplace_name"],
            //     },
            //     // {
            //     //   model: ExplanationModel,
            //     //   as: 'coucil'
            //     // }
            // ],
        });

        res.json(
            responsePayload(true, "Tải danh sách hội đồng thành công!", {
                items: transcript,
            })
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.create = async (req, res) => {
    try {
        const {
            comment,
            score,
            lecturer,
            topic,
            type,
            status
        } = req.body;
        // Create the new student record
        const newTranscript = await TranscriptModel.create({
            comment,
            score,
            lecturer,
            topic,
            type,
            status
        });

        res.json(responsePayload(true, "Tạo lời mời thành công!", newTranscript));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findExist = async (req, res) => {
    try {
        if (!req.params.lecturerid) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id lecturer!", null));
        }
        if (!req.params.topicid) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id topic!", null));
        }



        const transcript = await TranscriptModel.findAll({
            where: {
                type: 'thuyết minh',
                [Op.and]: [{ lecturer: req.params.lecturerid }, { topic: req.params.topicid }],
            },

        });

        if (!transcript) {
            return res.json(
                responsePayload(false, "Đề tài không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải thông tin đề tài thành công!", transcript)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findExistAcc = async (req, res) => {
    try {
        if (!req.params.lecturerid) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id lecturer!", null));
        }
        if (!req.params.topicid) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id topic!", null));
        }



        const transcript = await TranscriptModel.findAll({
            where: {
                type: 'nghiệm thu',
                [Op.and]: [{ lecturer: req.params.lecturerid }, { topic: req.params.topicid }],
            },
        });

        if (!transcript) {
            return res.json(
                responsePayload(false, "Đề tài không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải thông tin đề tài thành công!", transcript)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findWithExplanation = async (req, res) => {
    try {

        if (!req.params.topicid) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id topic!", null));
        }



        const transcript = await TranscriptModel.findAll({
            where: {
                type: 'thuyết minh',
                topic: req.params.topicid
            },
            include: [
                {
                    model: LecturerModel,
                    as: 'lecturerInfo'
                },
                {
                    model: TopicModel,
                    as: 'topicInfo'
                },
                {
                    model: TranscriptCommentModel,
                    as: 'commentInfo'
                },
                {
                    model: TranscriptScoreModel,
                    as: 'scoreInfo'
                },
            ]

        });

        if (!transcript) {
            return res.json(
                responsePayload(false, "Đề tài không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải thông tin đề tài thành công!", transcript)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findWithAcceptance = async (req, res) => {
    try {
        if (!req.params.topic_id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id topic!", null));
        }

        const transcript = await TranscriptModel.findAll({
            where: {
                type: 'nghiệm thu',
                status: '2',
                topic: req.params.topic_id
            },
            include: [
                {
                    model: LecturerModel,
                    as: 'lecturerInfo'
                },
                {
                    model: TopicModel,
                    as: 'topicInfo'
                },
                {
                    model: TranscriptCommentModel,
                    as: 'commentInfo'
                },
                {
                    model: TranscriptScoreModel,
                    as: 'scoreInfo'
                },

            ]

        });

        if (!transcript) {
            return res.json(
                responsePayload(false, "Đề tài không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải thông tin đề tài thành công!", transcript)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.findWithAcceptance1 = async (req, res) => {
    try {
        if (!req.params.topic_id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id topic!", null));
        }

        const transcript = await TranscriptModel.findAll({
            where: {
                type: 'nghiệm thu',
                status: '1',
                topic: req.params.topic_id
            },
            include: [
                {
                    model: LecturerModel,
                    as: 'lecturerInfo'
                },
                {
                    model: TopicModel,
                    as: 'topicInfo'
                },
                {
                    model: TranscriptCommentModel,
                    as: 'commentInfo'
                },
                {
                    model: TranscriptScoreModel,
                    as: 'scoreInfo'
                },

            ]

        });

        if (!transcript) {
            return res.json(
                responsePayload(false, "Đề tài không tồn tại!", null)
            );
        }

        res.json(
            responsePayload(true, "Tải thông tin đề tài thành công!", transcript)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.updateTranscript = async (req, res) => {
    try {

        if (!req.body.idArr) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id chủ đề!", null));
        }
        let id = req.body.idArr

        const transcript = await TranscriptModel.update(
            { status: 2 },
            {
                where: {
                    id: id,
                },
            });

        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", transcript)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.updateTranscriptComment = async (req, res) => {
    try {

        if (!req.body.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id chủ đề!", null));
        }
        let id = req.body.id
        let comment = req.body.comment

        const transcript = await TranscriptModel.update(
            { commentreport: comment },
            {
                where: {
                    id: id,
                },
            });

        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", transcript)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};

exports.updateTranscriptScore = async (req, res) => {
    try {

        if (!req.body.id) {
            return res
                .status(400)
                .json(responsePayload(false, "Thiếu id chủ đề!", null));
        }
        let id = req.body.id
        let score = req.body.score

        const transcript = await TranscriptModel.update(
            { scorereport: score },
            {
                where: {
                    id: id,
                },
            });

        res.json(
            responsePayload(true, "Cập nhật thông tin chủ đề thành công!", transcript)
        );
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};












