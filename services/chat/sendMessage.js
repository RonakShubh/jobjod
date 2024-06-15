const app = require("express")();
const http = require("http").Server(app);
const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const io = require("socket.io")(http);
var usp = io.of("/user-namespace");

const sendMessage = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {},
    } = entry;

    console.log("000000000000")
    usp.on("connection", function (socket) {
      console.log("user Connection");
      socket.on("disconnet", function () {
        console.log("user Disconnected");
      });
    });

    return "";
  } catch (error) {
    console.error("sendMessageError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = sendMessage;
