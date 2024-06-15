const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");

const getDetails = async (entry) => {
  try {
    let {
      body: { vEducationId },
    } = entry;

    let filter = {
      isDeleted: false,
      _id: new ObjectId(vEducationId),
    };

    const getDetails = await dbService.findOneRecord("EducationModel", filter);
    if (!getDetails?._id) return [];

    const result = {
      _id: getDetails?._id,
      vHighestEducationName: getDetails?.vHighestEducationName,
      arrDegree: getDetails?.arrDegree,
      vCreatedBy: getDetails?.vCreatedBy,
      dtCreatedAt: getDetails?.dtCreatedAt,
    };

    return result;
  } catch (error) {
    console.error("getDetailsError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = getDetails;
