const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");

const getDetails = async (entry) => {
  try {
    let {
      body: { vExperienceId },
    } = entry;

    let filter = {
      isDeleted: false,
      _id: new ObjectId(vExperienceId),
    };

    const getDetails = await dbService.findOneRecord("ExperienceModel", filter);
    if (!getDetails?._id) return [];

    const result = {
      _id: getDetails?._id,
      arrCategoryRole: getDetails?.arrCategoryRole,
      arrDepartment: getDetails?.arrDepartment,
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
