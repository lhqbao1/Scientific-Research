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
    "/api/topics",
    // [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );

  app.get("/api/topic/:id", controller.findById);

  app.get("/api/topic-acc/:id", controller.findByIdAcc);

  app.get("/api/topic/students/:id", controller.findWithStudent);

  app.get("/api/topic/explanation/:explanationid", controller.findWithExplanation);

  app.put("/api/topic-approve/", controller.updateBulkTopicApprove);


  app.get("/api/topic-set-explanation/", controller.findSetExplanation);


  // app.get("/api/students/:id", controller.findById);

  app.post("/api/topics", controller.create);

  app.delete("/api/topics/delete/:id", controller.remove);

  app.put("/api/topics/:id", controller.updateTopic);
  app.put("/api/topic-bulk/", controller.updateBulkTopic);
  app.put("/api/topic-bulk-status/", controller.updateBulkTopicStatus);

  app.put("/api/topic-bulk-status-true/", controller.updateBulkTopicStatusTrue);

  app.put("/api/topic-bulk-status-7/", controller.updateBulkTopicStatus7);

  app.put("/api/topic-acceptance/:id", controller.updateTopicAcc);

};
