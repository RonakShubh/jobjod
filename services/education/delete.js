const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const deleteEducation = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vEducationId },
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
      _id: new ObjectId(vEducationId),
      isDeleted: false,
    };

    let checkData = await dbService.findOneRecord("EducationModel", condition, {
      _id: 1,
    });
    if (!checkData?._id) throw new Error(Message.recordNotFound);

    let updateData = {
      isDeleted: true,
      dtDeletedAt: Date.now(),
    };

    let updateResponse = await dbService.findOneAndUpdateRecord(
      "EducationModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );
    if (!updateResponse) throw new Error(Message.systemError);

    return [];
  } catch (error) {
    console.error("deleteEducationError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deleteEducation;
