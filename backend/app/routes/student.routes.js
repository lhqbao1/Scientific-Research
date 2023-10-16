const { authJwt } = require("../middlewares");
const controller = require("../controllers/student.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.get(
    "/api/students/",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );

  app.get("/api/students/topic/:id", controller.findTopic);


  app.get("/api/students/:id", controller.findById);

  app.get("/api/student-code/:code", controller.findByCode);


  app.post("/api/student/", controller.create);

  app.post("/api/students/", controller.bulkCreate);


  app.delete("/api/students/delete/:id", controller.remove);

  app.put("/api/students/:id", controller.updateStudent);
};
