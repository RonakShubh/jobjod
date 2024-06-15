const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const deletePoster = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vPosterId },
    } = entry;

    let condition = {
      _id: new ObjectId(vPosterId),
      isDeleted: false,
    };

    let checkData = await dbService.findOneRecord("PosterModel", condition, {
      _id: 1,
    });
    if (!checkData?._id) throw new Error(Message.recordNotFound);

    let updateData = {
      isDeleted: true,
      dtDeletedAt: Date.now(),
    };

    let updateResponse = await dbService.findOneAndUpdateRecord(
      "PosterModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );
    if (!updateResponse) throw new Error(Message.systemError);

    return [];
  } catch (error) {
    console.error("deletePosterError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deletePoster;
