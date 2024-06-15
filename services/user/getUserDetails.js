const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const getUserDetails = async (payload) => {
  try {
    let {
      user: { _id: userId },
      body: {},
    } = payload;

    let condition = {
      _id: new ObjectId(userId),
      isDeleted: false,
    };

    let checkUser = await dbService.findOneRecord("UserModel", condition, {
      _id: 1,
    });
    if (!checkUser) return [];

    let aggregateQuery = [
      {
        $match: condition,
      },
      {
        $project: {
          _id: 1,
          vName: 1,
          vEmail: 1,
          vProfileImage: 1,
          vMobile: 1,
          vAddress: 1,
          vLanguage: 1,
          dtBirthDate: 1,
          vGender: 1,
          vHighestEducation: 1,
          vDegree: 1,
          vSpecisation: 1,
          vCollegeName: 1,
          vEducationType: 1,
          vWorkExperience: 1,
          objTotalYearsExperience: 1,
          vJobTitle: 1,
          vDepartment: 1,
          vCategoryOrRole: 1,
          vCompanyName: 1,
          vIndustryName: 1,
          arrSkills: 1,
          vCurrentlyWorking: 1,
          dtStartDate: 1,
          iCurrentSalary: 1,
          iExperationSalary: 1,
          vEmploymentType: 1,
          vNoticePeriod: 1,
          vEnglishSpeakLevel: 1,
          arrLanguagesSpeak: 1,
          objPreferredWorkType: 1,
          vResumeFile: 1,
          iWalletBalance: 1,
          vPaymentId: 1,
          vPlanId: 1,
          vLatitude: 1,
          vLongitude: 1,
          vEstablishedYear: 1,
          vIndustryType: 1,
          vPerksOrBenefits: 1,
          vInterviewAddress: 1,
          iTotalEmployees: 1,
          isCompany: 1,
          isAdmin: 1,
          isDeleted: 1,
          vUpdatedBy: 1,
          dtCreatedAt: 1,
          dtDeletedAt: 1,
          isUpdated: 1,
          dtUpdatedAt: 1,
        },
      },
      { $sort: { _id: -1 } },
    ];

    const dataList = await dbService.aggregateData("UserModel", aggregateQuery);
    if (!dataList) throw new Error(Message.systemError);

    return { data: dataList[0] };
  } catch (error) {
    console.error("getUserDetailsError ------------>", error);
    throw new Error(error?.message);
  }
};
module.exports = getUserDetails;
