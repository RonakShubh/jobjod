const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const deleteMessage = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vMessageId },
    } = entry;

    const messageId = vMessageId;
    const myId = userId;

    let condition = {
      _id: new ObjectId(messageId),
      vTo: new ObjectId(myId),
      isDeleted: false,
    };

    let updateData = {
      isDeleted: true,
      dtDeletedAt: Date.now(),
    };

    let updateResponse = await dbService.findOneAndUpdateRecord(
      "MessageModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );
    if (!updateResponse) throw new Error(Message.systemError);

    return {};
  } catch (error) {
    console.error("deleteMessageError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteMessage;
