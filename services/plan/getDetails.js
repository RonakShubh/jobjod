const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");

const getDetails = async (entry) => {
  try {
    let {
      body: { vPlanId },
    } = entry;

    let filter = {
      isDeleted: false,
      _id: new ObjectId(vPlanId),
    };

    const getDetails = await dbService.findOneRecord("PlanModel", filter);
    if (!getDetails?._id) return {};

    const result = {
      _id: getDetails?._id,
      vPlanName: getDetails?.vPlanName,
      iOldPrice: getDetails?.iOldPrice,
      iPrice: getDetails?.iPrice,
      iDatabaseUnlocks: getDetails?.iDatabaseUnlocks,
      iLiveJObs: getDetails?.iLiveJObs,
      iOldValidity: getDetails?.iOldValidity,
      iValidity: getDetails?.iValidity,
      vMobileNumber: getDetails?.vMobileNumber,
      vCompanyName: getDetails?.vCompanyName,
      iNumberOfOpenings: getDetails?.iNumberOfOpenings,
      isDeleted: getDetails?.isDeleted,
      vCreatedBy: getDetails?.vCreatedBy,
      dtCreatedAt: getDetails?.dtCreatedAt,
    };

    return result;
  } catch (error) {
    console.error("listError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = getDetails;
