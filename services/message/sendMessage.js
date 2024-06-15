const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const shared = require("../../shared/index");
const Hash = require("../../utils/hash");

const sendMessage = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vTo, vMessage },
    } = entry;
    console.log("000000000000000");

    const from = userId;
    const lowerId = from < vTo ? from : vTo;
    const higherId = from > vTo ? from : vTo;
    const chatId = Hash(lowerId, higherId);

    const sentMessage = await dbService.createOneRecord("MessageModel", {
      vChatId: chatId,
      vFrom: new ObjectId(from),
      vTo: new ObjectId(vTo),
      vMessage,
      dtCreatedAt: Date.now(),
    });
    if (!sentMessage) throw new Error(Message.systemError);
    console.log("111111111111111111");

    // await sentMessage.populate("vFrom").populate("vTo").execPopulate();
    console.log("shared.users------>", shared.users);

    const users = shared.users;
    const findUsers = users.filter((user) => user._id == vTo);
    console.log("findUsers------>", findUsers);
    findUsers.forEach((user) => {
      user.socket.emit("message", {
        message: sentMessage,
      });
    });
    console.log("sentMessage------>", sentMessage);

    return { message: sentMessage };
  } catch (error) {
    console.error("sendMessageError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = sendMessage;
