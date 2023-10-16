const { authJwt } = require("../middlewares");
const controller = require("../controllers/transcriptcomment.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post(
        "/api/transcript-comment/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.create
    );


};
