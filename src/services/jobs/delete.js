const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const deleteJob = async (entry) => {
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
      isDeleted: true,
      dtDeletedAt: Date.now(),
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

    return [];
  } catch (error) {
    console.error("deleteJobError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteJob;
