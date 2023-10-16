const { authJwt } = require("../middlewares");
const controller = require("../controllers/invitationacceptance.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.get(
        "/api/invitationacceptance/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAll
    );

    //   app.get(
    //     "/api/lecturers/work_place/:work_place_id",
    //     // [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.findByWorkPlace 
    //   );

    // app.get("/api/invitation/:id", controller.findById);

    // app.get("/api/refused-invitation/:id", controller.getRefusedInvitation);

    app.post("/api/invitationacceptance/", controller.create);

    app.put("/api/invitationacceptance/:id", controller.updateInvitation);

    app.get("/api/sent-invitationacceptance/:advisor/:topic", controller.getSent);

    app.get("/api/check-invitationacceptance/:advisor/:lecturer/:topic", controller.checkInvi);

    app.get("/api/checkrole-invitationacceptance/:advisor/:topic/:type", controller.checkRole);

    app.get("/api/recieve-invitationacceptance/:lecturer", controller.checkRecieveInvi);

    // app.get("/api/accepted-invitation/:id", controller.getAcceptedInvitation);


};
