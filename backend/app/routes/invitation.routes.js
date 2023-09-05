const { authJwt } = require("../middlewares");
const controller = require("../controllers/invitation.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });

    app.get(
        "/api/invitation/",
        // [authJwt.verifyToken, authJwt.isAdmin],
        controller.findAll
    );

    //   app.get(
    //     "/api/lecturers/work_place/:work_place_id",
    //     // [authJwt.verifyToken, authJwt.isAdmin],
    //     controller.findByWorkPlace 
    //   );

    app.get("/api/invitation/:id", controller.findById);

    app.post("/api/invitation", controller.create);

    app.put("/api/invitation/:id", controller.updateInvitation);

    app.get("/api/accepted-invitation/:id", controller.getAcceptedInvitation);

    //   app.delete("/api/lecturers/delete/:id", controller.remove);

    //   app.put("/api/lecturers/:id", controller.updateLecturer);
};
