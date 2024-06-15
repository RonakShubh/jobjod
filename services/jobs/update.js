const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const update = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vJobId },
    } = entry;

    let condition = {
      _id: new ObjectId(vJobId),
      isDeleted: false,
    };

    let checkData = await dbService.findOneRecord("JobsModel", condition, {
      _id: 1,
    });
    if (!checkData?._id) throw new Error(Message.recordNotFound);

    let updateData = {
      ...entry.body,
      isUpdated: true,
      dtUpdatedAt: Date.now(),
      vUpdatedBy: new ObjectId(userId),
    };

    let updateResponse = await dbService.findOneAndUpdateRecord(
      "JobsModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );
    if (!updateResponse) throw new Error(Message.systemError);

    return updateResponse;
  } catch (error) {
    console.error("updateError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
