const { authJwt } = require("../middlewares");
const controller = require("../controllers/lecturer.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.get(
    "/api/lecturers/",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );

  app.get("/api/lecturer/:id", controller.findById);

  app.get("/api/lecturer-acc/:id", controller.findByIdAcc);

  // app.get("/api/lecturerTopic/:id", controller.getLecturerTopic);
  app.get("/api/lecturer-login/:id", controller.findByIdLogin);


  app.get(
    "/api/lecturers/work_place/:work_place_id",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.findByWorkPlace
  );

  app.get(
    "/api/lecturers/coucil/",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.findByCoucil
  );



  // app.get("/api/students/:id", controller.findById);

  app.post("/api/lecturers", controller.create);

  app.delete("/api/lecturers/delete/:id", controller.remove);

  app.put("/api/lecturers/:id", controller.updateLecturer);
};
