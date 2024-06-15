const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");

const getDetails = async (entry) => {
  try {
    let {
      body: { vJobId },
    } = entry;

    let filter = {
      isDeleted: false,
      _id: new ObjectId(vJobId),
    };

    const getDetails = await dbService.findOneRecord("JobsModel", filter);
    if (!getDetails?._id) return {};

    const result = {
      _id: getDetails?._id,
      vJobTitle: getDetails?.vJobTitle,
      vCategory: getDetails?.vCategory,
      vLocation: getDetails?.vLocation,
      iMinSalary: getDetails?.iMinSalary,
      iMaxSalary: getDetails?.iMaxSalary,
      vMonthlyBonus: getDetails?.vMonthlyBonus,
      vBonusType: getDetails?.vBonusType,
      iBonusAmount: getDetails?.iBonusAmount,
      vMinExperience: getDetails?.vMinExperience,
      vMaxExperience: getDetails?.vMaxExperience,
      vCandidateQualification: getDetails?.vCandidateQualification,
      vGenderHire: getDetails?.vGenderHire,
      iCandidateArea: getDetails?.iCandidateArea,
      vWorkPlace: getDetails?.vWorkPlace,
      iCandidateCallTime: getDetails?.iCandidateCallTime,
      iVacancies: getDetails?.iVacancies,
      vEmploymentType: getDetails?.vEmploymentType,
      vWorkTimings: getDetails?.vWorkTimings,
      vInterviewSchedule: getDetails?.vInterviewSchedule,
      arrSkills: getDetails?.arrSkills,
      vDescription: getDetails?.vDescription,
      vCreatedBy: getDetails?.vCreatedBy,
      dtCreatedAt: getDetails?.dtCreatedAt,
      isNewJob: getDetails?.isNewJob,
      isJobVerified: getDetails?.isJobVerified,
      vLatitude: getDetails?.vLatitude,
      vLongitude: getDetails?.vLongitude,
    };

    return result;
  } catch (error) {
    console.error("listError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = getDetails;
