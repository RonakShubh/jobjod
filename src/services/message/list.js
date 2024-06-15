const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const ObjectId = require("mongodb").ObjectId;

const list = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {},
    } = entry;

    const myId = userId;
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
    });

    return { messages };
  } catch (error) {
    console.error("listError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
