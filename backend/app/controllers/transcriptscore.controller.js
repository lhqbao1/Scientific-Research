const db = require("../models");
const LecturerModel = db.lecturer
const TranscriptScoreModel = db.transcriptscore
const TranscriptModel = db.transcript
const { Op } = require("sequelize");

responsePayload = (status, message, payload) => ({
    status,
    message,
    payload,
});



exports.create = async (req, res) => {
    try {

        // Create the new student record
        const newTranscript = await TranscriptScoreModel.create(req.body);

        res.json(responsePayload(true, "Tạo lời mời thành công!", newTranscript));
    } catch (err) {
        res.status(500).json(responsePayload(false, err.message, null));
    }
};
















