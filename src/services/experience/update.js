const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const update = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vExperienceId },
    } = entry;

    let checkAdmin = await dbService.findOneRecord(
      "UserModel",
      { _id: new ObjectId(userId) },
      {
        _id: 1,
        isAdmin: 1,
      }
    );
    if (!checkAdmin?.isAdmin) throw new Error(Message.unauthorizedUser);

    let condition = {
      _id: new ObjectId(vExperienceId),
      isDeleted: false,
    };

    let checkData = await dbService.findOneRecord(
      "ExperienceModel",
      condition,
      {
        _id: 1,
      }
    );
    if (!checkData?._id) throw new Error(Message.recordNotFound);

    let updateData = {
      ...entry.body,
      isUpdated: true,
      dtUpdatedAt: Date.now(),
      vUpdatedBy: new ObjectId(userId),
    };

    let updateResponse = await dbService.findOneAndUpdateRecord(
      "ExperienceModel",
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
