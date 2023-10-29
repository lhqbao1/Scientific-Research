const { authJwt } = require("../middlewares");
const controller = require("../controllers/notification.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.get(
        "/api/notifications/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAll
    );
    app.get(
        "/api/notifications-add-file-explanation/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAddFileExplanation
    );
    app.get(
        "/api/notifications-start-report/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.findStartReport
    );
    app.get(
        "/api/notifications-2/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAllPhase2
    );
    app.get(
        "/api/notifications-addfile/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAllAddFile
    );
    app.get(
        "/api/notifications-addfile2/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAllAddFile2
    );

    app.post(
        "/api/notification/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.create
    );

    app.put(
        "/api/notification/:id",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.update
    );


};
