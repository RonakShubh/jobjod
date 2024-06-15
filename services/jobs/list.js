const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");
const paginationFn = require("../../utils/pagination");

const list = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {
        vSearchText = "",
        vSortBy = "",
        iMinSalary,
        iMaxSalary,
        iDistance,
        vSector = "",
        vPostedIn = "",
        vJobType = "",
        iPage = 1,
        iLimit = 10,
        arrJobViews,
        arrCallConnected,
        arrJobUnlocks,
        isJobLive,
        isHiringCompleted,
      },
    } = entry;

    const { sortBy, docLimit, noOfDocSkip } = paginationFn({
      iPage,
      iLimit,
    });

    let filter = {
      isDeleted: false,
    };

    if (vSearchText) {
      var regex = new RegExp(vSearchText, "i");
      filter["$or"] = [
        { vJobTitle: regex },
        { vLocation: regex },
        { vExperience: regex },
        { vWorkPlace: regex },
        { vCategory: regex },
        // { iVacancies: regex },
        { vEmploymentType: regex },
      ];
    }
    if (iMinSalary && iMaxSalary) {
      filter["iMinSalary"] = { $gte: iMinSalary };
      filter["iMaxSalary"] = { $lte: iMaxSalary };
    }

    if (iDistance) {
      filter["iCandidateArea"] = { $gte: iDistance };
      filter["iCandidateArea"] = { $lte: iDistance };
    }

    if (vSector) {
      filter["vJobTitle"] = vSector;
    }

    if (vJobType) {
      filter["$or"] = [{ vWorkPlace: vJobType }, { vEmploymentType: vJobType }];
    }

    if (arrJobViews && Array.isArray(arrJobViews) && arrJobViews.length > 0) {
      let checkJobId = arrJobViews.map((id) => ObjectId(id));
      filter["arrJobViews"] = { $in: checkJobId };
    }

    if (
      arrCallConnected &&
      Array.isArray(arrCallConnected) &&
      arrCallConnected.length > 0
    ) {
      let checkCallId = arrCallConnected.map((id) => ObjectId(id));
      filter["arrCallConnected"] = { $in: checkCallId };
    }

    if (
      arrJobUnlocks &&
      Array.isArray(arrJobUnlocks) &&
      arrJobUnlocks.length > 0
    ) {
      let checkUnlockId = arrJobUnlocks.map((id) => ObjectId(id));
      filter["arrJobUnlocks"] = { $in: checkUnlockId };
    }

    if (isJobLive) {
      filter["isJobLive"] = isJobLive;
    }

    if (isHiringCompleted) {
      filter["isHiringCompleted"] = isHiringCompleted;
    }

    // if (vPostedIn) {
    //   filter["$or"] = [{ dtCreatedAt: vJobType }];
    // }

    let aggregateQuery = [
      {
        $match: filter,
      },
      //tblusers
      {
        $lookup: {
          from: "tblusers",
          localField: "vCreatedBy",
          foreignField: "_id",
          as: "usersData",
        },
      },
      {
        $unwind: {
          path: "$usersData",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $sort: sortBy },
      { $skip: noOfDocSkip },
      { $limit: docLimit },
      {
        $project: {
          _id: 1,
          vJobTitle: 1,
          vCategory: 1,
          vLocation: 1,
          iMinSalary: 1,
          iMaxSalary: 1,
          vMonthlyBonus: 1,
          vBonusType: 1,
          iBonusAmount: 1,
          vMinExperience: 1,
          vMaxExperience: 1,
          vCandidateQualification: 1,
          vGenderHire: 1,
          iCandidateArea: 1,
          vWorkPlace: 1,
          iCandidateCallTime: 1,
          iVacancies: 1,
          vEmploymentType: 1,
          vWorkTimings: 1,
          vInterviewSchedule: 1,
          arrSkills: 1,
          vDescription: 1,
          dtCreatedAt: 1,
          isNewJob: 1,
          isJobVerified: 1,
          vLatitude: 1,
          vLongitude: 1,
          vCompanyName: "$usersData.vCompanyName",
          vCompanyEmail: "$usersData.vEmail",
          vCompanyImage: "$usersData.vProfileImage",
          vCompanyMobile: "$usersData.vMobile",
          vEstablishedYear: "$usersData.vEstablishedYear",
          iTotalEmployees: "$usersData.iTotalEmployees",
          vIndustryType: "$usersData.vIndustryType",
          vPerksOrBenefits: "$usersData.vPerksOrBenefits",
          vInterviewAddress: "$usersData.vInterviewAddress",
        },
      },
    ];

    let dataList = await dbService.aggregateData("JobsModel", aggregateQuery);
    let totalCount = await dbService.recordsCount("JobsModel", filter);
    if (!dataList) throw new Error(Message.systemError);

    return { data: dataList, iCount: totalCount };
  } catch (error) {
    console.error("listError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
