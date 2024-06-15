const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {
        vPlanName,
        iOldPrice = 0,
        iPrice,
        iDatabaseUnlocks = 0,
        iLiveJObs = 0,
        iOldValidity = 0,
        iValidity,
        vMobileNumber = "",
        vCompanyName = "",
        iNumberOfOpenings = 0,
      },
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
      vPlanName,
    };

    let checkData = await dbService.findOneRecord("PlanModel", filter, {
      _id: 1,
    });
    if (checkData) throw new Error(Message.nameAlreadyExists);

    let payload = {
      vPlanName,
      iOldPrice,
      iPrice,
      iDatabaseUnlocks,
      iLiveJObs,
      iOldValidity,
      iValidity,
      vMobileNumber,
      vCompanyName,
      iNumberOfOpenings,
      vCreatedBy: new ObjectId(userId),
      dtCreatedAt: Date.now(),
    };

    const saveData = await dbService.createOneRecord("PlanModel", payload);
    if (!saveData) throw new Error(Message.systemError);

    let result = {
      vPlanName: saveData?.vPlanName,
      iPrice: saveData?.iPrice,
      iValidity: saveData?.iValidity,
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
