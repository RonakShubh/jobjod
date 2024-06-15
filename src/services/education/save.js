const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vHighestEducationName, arrDegree },
    } = entry;

    let checkAdmin = await dbService.findOneRecord(
      "UserModel",
      { _id: new ObjectId(userId) },
      {
        _id: 1,
        isAdmin: 1,
      }
    );
    if (!checkAdmin.isAdmin) throw new Error(Message.unauthorizedUser);

    let filter = {
      isDeleted: false,
      vHighestEducationName,
    };

    let checkData = await dbService.findOneRecord("EducationModel", filter, {
      _id: 1,
    });
    if (checkData) throw new Error(Message.nameAlreadyExists);

    let payload = {
      vHighestEducationName,
      arrDegree,
      vCreatedBy: new ObjectId(userId),
      dtCreatedAt: Date.now(),
    };

    const saveData = await dbService.createOneRecord("EducationModel", payload);
    if (!saveData) throw new Error(Message.systemError);

    let result = {
      vHighestEducationName: saveData?.vHighestEducationName,
      arrDegree: saveData?.arrDegree,
      vCreatedBy: saveData?.vCreatedBy,
      dtCreatedAt: saveData?.dtCreatedAt,
    };

    return result;
  } catch (error) {
    console.error("saveError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = save;
