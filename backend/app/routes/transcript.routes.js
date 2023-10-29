const { authJwt } = require("../middlewares");
const controller = require("../controllers/transcript.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.get(
        "/api/transcripts/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAll
    );

    app.post("/api/transcript/", controller.create)


    app.get("/api/transcript/:lecturerid/:topicid/", controller.findExist);

    app.get("/api/transcript-acc/:lecturerid/:topicid/", controller.findExistAcc);


    app.get("/api/transcript/:topicid/", controller.findWithExplanation);

    app.get("/api/transcript-acc/:topic_id/", controller.findWithAcceptance);

    app.get("/api/transcript-acc-1/:topic_id/", controller.findWithAcceptance1);




    app.put("/api/transcript/", controller.updateTranscript);
    app.put("/api/transcript-comment/", controller.updateTranscriptComment);
    app.put("/api/transcript-score/", controller.updateTranscriptScore);

};
