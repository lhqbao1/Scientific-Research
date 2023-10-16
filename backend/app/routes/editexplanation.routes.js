const { authJwt } = require("../middlewares");
const controller = require("../controllers/editexplanation.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });


    app.get("/api/editexplanation/", controller.getAll)
    app.post("/api/editexplanation/", controller.create);
    app.get("/api/editexplanation-topic/:id", controller.getWithTopicId)

    // app.get("/api/file/:topic_id", controller.findFiles);
    // app.get("/api/acceptance-file/:topic_id", controller.findAcceptanceFiles);
    // app.get("/api/letter-file/:topic_id", controller.findLetterFiles);




};
