const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const config = require("./app/config/config.js");

const app = express();

const corsOptions = {
  origin: "http://localhost:8000",
  // Allow follow-up middleware to override this CORS for options
  preflightContinue: true,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "50mb" }));
// parse requests of content-type - application/x-www-form-urlencoded

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

// database
const db = require("./app/models");
const Role = db.role;
const User = db.user;

db.sequelize.sync().then(() => {
  initial(); // Just use it in development, at the first time execution!. Delete it in production
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi there, welcome to this tutorial." });
});

// api routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/lecturer.routes")(app);
require("./app/routes/topic.routes")(app);
require("./app/routes/invitation.routes")(app);
require("./app/routes/file.routes")(app);
require("./app/routes/status.routes")(app);
require("./app/routes/workplace.routes")(app);
require("./app/routes/explanation.routes")(app);
require("./app/routes/transcript.routes")(app);
require("./app/routes/major.routes")(app);
require("./app/routes/invitationacceptance.routes")(app);
require("./app/routes/commissioner.routes")(app);
require("./app/routes/email.routes")(app);
require("./app/routes/notification.routes")(app);
require("./app/routes/editexplanation.routes")(app);
require("./app/routes/counter.routes")(app);
require("./app/routes/transcriptcomment.routes")(app);
require("./app/routes/transcriptscore.routes")(app);

// require("./app/routes/email.routes")(app);




// set port, listen for requests
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function initial() {
  // await Role.findOrCreate({
  //   where: { id: "4" },
  //   defaults: {
  //     name: "Admin",
  //     roleCode: "admin",
  //   },
  // });

  // await Role.findOrCreate({
  //   where: { id: "2" },
  //   defaults: {
  //     name: "User",
  //     roleCode: "user",
  //   },
  // });

  // await User.findOrCreate({
  //   where: { email: "admin@gmail.com" },
  //   defaults: {
  //     email: "admin@gmail.com",
  //     firstName: "Admin",
  //     lastName: "Project",
  //     password: bcrypt.hashSync("123456", 8),
  //     phonenumber: "123456789",
  //     role: "4",
  //   },
  // });
}
