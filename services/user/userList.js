const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const userList = async (payload) => {
  try {
    let {
      user: { _id: userId },
      body: { vSearchText, isCompany = false },
    } = payload;

    let checkUser = await dbService.findOneRecord(
      "UserModel",
      {
        _id: new ObjectId(userId),
        isDeleted: false,
      },
      {
        _id: 1,
        isAdmin: 1,
      }
    );
    if (!checkUser) return [];

    let filterCondition = {
      isDeleted: false,
    };

    if (!checkUser?.isAdmin) {
      filterCondition["isCompany"] = isCompany;
    }

    if (vSearchText) {
      var regex = new RegExp(vSearchText, "i");
      filterCondition["$or"] = [
        { vName: regex },
        { vMobile: regex },
        { vJobTitle: regex },
        { vCompanyName: regex },
      ];
    }

    let aggregateQuery = [
      {
        $match: filterCondition,
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
    let totalCount = await dbService.recordsCount("UserModel", filterCondition);
    if (!dataList) throw new Error(Message.systemError);

    return { data: dataList, iCount: totalCount };
  } catch (error) {
    console.error("userListError ------------>", error);
    throw new Error(error?.message);
  }
};
module.exports = userList;
