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

  // app.get("/api/students/:id", controller.findById);

  app.post("/api/lecturers", controller.create);

  app.delete("/api/lecturers/delete/:id", controller.remove);

  app.put("/api/lecturers/:id", controller.updateLecturer);
};
