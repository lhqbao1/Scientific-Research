const { authJwt } = require("../middlewares");
const controller = require("../controllers/email.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.post("/api/send-email-approve/", controller.sendEmailApprove)
    app.post("/api/send-email-approve-report/", controller.sendEmailApproveReport)

    // app.get(
    //     "/api/invitation/",
    //     // [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.findAll
    // );


    // app.get("/api/file/:id", controller.findById);

    // app.post("/api/file", controller.create);
    // app.get("/api/file/:topic_id", controller.findFiles);
    // app.get("/api/acceptance-file/:topic_id", controller.findAcceptanceFiles);
    // app.get("/api/letter-file/:topic_id", controller.findLetterFiles);


    // app.put("/api/file/:id", controller.updateFile);

    // app.get("/api/accepted-invitation/:id", controller.getAcceptedInvitation);


};
