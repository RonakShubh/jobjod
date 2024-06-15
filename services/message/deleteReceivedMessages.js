const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const deleteReceivedMessages = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {},
    } = entry;
    const myId = userId;

    let condition = {
      vTo: ObjectId(myId),
      isDeleted: false,
      isTriedToGet: true,
    };

    let updateData = {
      isDeleted: true,
      dtDeletedAt: Date.now(),
    };

    let updateResponse = await dbService.updateManyRecords(
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
    console.error("deleteReceivedMessagesError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteReceivedMessages;
