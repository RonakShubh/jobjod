const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const ObjectId = require("mongodb").ObjectId;

const getMessagesAndEmit = async (user) => {
  try {
    console.log("user-----00000000------>", user);
    const myId = user._id;
    const chatId = user.chatId;
    console.log("myId-----00000000------>", myId);
    console.log("chatId-----1111111------>", chatId);
    const messages = await dbService.findAllRecordsWithUlterPopulate(
      "MessageModel",
      { vTo: new ObjectId(myId), isDeleted: false }
    );
    if (!messages) throw new Error(Message.recordNotFound);

    messages.forEach((message) => {
      dbService.findOneAndUpdateRecord(
        "MessageModel",
        { _id: ObjectId(message._id), isDeleted: false },
        { isTriedToGet: true },
        {
          returnOriginal: false,
        }
      );
      user.socket.emit("message", { message });
    });
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = getMessagesAndEmit;
