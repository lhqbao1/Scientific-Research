const { authJwt } = require("../middlewares");
const controller = require("../controllers/explanation.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );

        next();
    });



    app.get("/api/explanations/", controller.findAll);
    app.get("/api/acceptances/", controller.findAllAcc);

    app.post("/api/explanation/", controller.create)
    app.get("/api/explanation/:id", controller.findById);
    app.put("/api/explanation/:id", controller.updateBoard);
    // app.put("/api/explanation/secretary/:id", controller.setSecretary);



};
