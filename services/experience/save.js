const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { arrCategoryRole, arrDepartment },
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

    let payload = {
      arrCategoryRole,
      arrDepartment,
      vCreatedBy: new ObjectId(userId),
      dtCreatedAt: Date.now(),
    };

    const saveData = await dbService.createOneRecord(
      "ExperienceModel",
      payload
    );
    if (!saveData) throw new Error(Message.systemError);

    let result = {
      arrCategoryRole: saveData?.arrCategoryRole,
      arrDepartment: saveData?.arrDepartment,
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
