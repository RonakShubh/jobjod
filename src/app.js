require("dotenv").config({ path: "./.env" });
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
// const session = require("express-session");
const cors = require("cors");
const path = require("path");
const socketIO = require("socket.io");
const shared = require("./shared/index");
const getMessagesAndEmit = require("./services/controller/messageController");
const db = require("./db/index");
const { failAction } = require("./utils/response");
const helmet = require("helmet");
const routes = require("./api");

const port = process.env.PORT ? process.env.PORT : 3000;
const app = express();

// Access-Control-Allow-Origin
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

const server = http.createServer(app);
const io = socketIO(server);
shared.io = io;
// var io = require("socket.io")(server, {
//   cors: { origin: "*" },
// });

let users = [];
shared.users = users;

// app.use(session({ secret: SESSION_SECRET }));
app.use(helmet());

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

// io.on("connection", (socket) => {
//   console.log(socket.id, " has Joined");
//   socket.on("signin", (user) => {
//     console.log("user------->", user);
//     const newUser = { ...user, socket };
//     newUser["chatId"] = socket.id;
//     // console.log("newUser------->", newUser);
//     users.push(newUser);
//     socket.emit("signin");
//     shared.users = users;
//     getMessagesAndEmit(newUser);
//   });

//   socket.on("user-left", () => {
//     users = users.filter((x) => x.socket.id !== socket.id);
//     shared.users = users;
//   });

//   socket.on("disconnect", () => {
//     users = users.filter((x) => x.socket.id !== socket.id);
//     shared.users = users;
//   });
// });

var clients = [];
var history = [];

io.on("connection", (socket) => {
  console.log("user Connection");
  console.log(socket.id, " has Joined");
  socket.on("signin", (id) => {
    console.log("id------>", id);
    // clients[id] = socket;
    clients.push({ id: socket.client.id });
    // if (clients[id]) clients[id].emit("previous", clients);
    console.log("clients--------->", clients);
    socket.emit("userList", clients);
    var getClientID = clients.find((e) => e.id === socket.client.id);
    console.log("the Client ---->", getClientID);
    if (getClientID) {
      socket.emit("previous", history);
    }
  });
  // socket.on("previous", (previous) => {
  //   console.log("previous--------->", previous);
  //   let targetId = previous ? previous.targetId : "";
  //   if (clients[targetId]) clients[targetId].emit("previous", previous);
  // });
  socket.on("message", (msg) => {
    console.log("msg--------->", msg);
    history.push(msg);
    console.log("history---->", history);
    // io.sockets.emit("message", msg);
    let targetId = msg ? msg.targetId : "";
    if (clients[targetId]) clients[targetId].emit("message", msg);
  });
});

// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));
app.use("/api", routes);

app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    // we had a joi error, let's return a custom 400 json response
    res
      .status(400)
      .json(failAction(err.error.message.toString().replace(/[\""]+/g, "")));
  } else {
    // pass on to another error handler
    next(err);
  }
});
app.get("/", (req, res) => res.send(`<h1>Project devlop environment</h1>`));

server.listen(port, "0.0.0.0", () => {
  console.log(`Express server listening on port ${port}`);
});
