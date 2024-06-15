const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {
        vJobTitle,
        vCategory,
        vLocation,
        iMinSalary,
        iMaxSalary,
        vMonthlyBonus,
        vBonusType,
        iBonusAmount,
        vMinExperience,
        vMaxExperience,
        vCandidateQualification,
        vGenderHire,
        iCandidateArea,
        vWorkPlace,
        iCandidateCallTime,
        iVacancies,
        vEmploymentType,
        vWorkTimings,
        vInterviewSchedule,
        arrSkills,
        vDescription,
        isNewJob,
        isJobVerified,
        vLatitude,
        vLongitude,
      },
    } = entry;

    let payload = {
      vJobTitle,
      vCategory,
      vLocation,
      iMinSalary,
      iMaxSalary,
      vMonthlyBonus,
      vBonusType,
      iBonusAmount,
      vMinExperience,
      vMaxExperience,
      vCandidateQualification,
      vGenderHire,
      iCandidateArea,
      vWorkPlace,
      iCandidateCallTime,
      iVacancies,
      vEmploymentType,
      vWorkTimings,
      vInterviewSchedule,
      arrSkills,
      vDescription,
      isNewJob,
      isJobVerified,
      vLatitude,
      vLongitude,
      vCreatedBy: new ObjectId(userId),
      dtCreatedAt: Date.now(),
    };

    const saveData = await dbService.createOneRecord("JobsModel", payload);
    if (!saveData) throw new Error(Message.systemError);

    let result = {
      vJobTitle: saveData?.vJobTitle,
      vLocation: saveData?.vLocation,
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
