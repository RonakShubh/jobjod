const { Router } = require("express");

// Start Permission Middleware//
const userAuthentication = require("../../middleware/authentication/userAuthentication");

// End Permission Middleware //
const userRouter = require("./user/index");
const educationRouter = require("./education/index");
const jobRouter = require("./jobs/index");
const planRouter = require("./plan/index");
const posterRouter = require("./poster/index");
const notificationRouter = require("./notification/index");
const countryRouter = require("./country/index");
const experienceRouter = require("./experience/index");
const chatRouter = require("./chat/index");
const messageRouter = require("./message/index");

const app = Router();

/*********** Combine all Routes ********************/

app.use("/user", userRouter);
app.use("/plan", planRouter);
app.use("/education", userAuthentication.bind({}), educationRouter);
app.use("/job", userAuthentication.bind({}), jobRouter);
app.use("/poster", userAuthentication.bind({}), posterRouter);
app.use("/notification", notificationRouter);
app.use("/country", userAuthentication.bind({}), countryRouter);
app.use("/experience", userAuthentication.bind({}), experienceRouter);
app.use("/chat", userAuthentication.bind({}), chatRouter);
app.use("/message", userAuthentication.bind({}), messageRouter);

module.exports = app;
