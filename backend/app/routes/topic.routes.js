const { authJwt } = require("../middlewares");
const controller = require("../controllers/topic.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.get(
    "/api/topics/",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );

  app.get("/api/topic/:id", controller.findById);

  app.get("/api/topic/students/:id", controller.findWithStudent);


  // app.get("/api/students/:id", controller.findById);

  app.post("/api/topics", controller.create);

  app.delete("/api/topics/delete/:id", controller.remove);

  app.put("/api/topics/:id", controller.updateTopic);
};
