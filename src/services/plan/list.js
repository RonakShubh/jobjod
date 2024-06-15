const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const list = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vSearchText = "" },
    } = entry;

    let filter = {
      isDeleted: false,
    };

    if (vSearchText) {
      var regex = new RegExp(vSearchText, "i");
      filter["$or"] = [
        { vPlanName: regex },
        { iPrice: regex },
        { iValidity: regex },
      ];
    }

    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $project: {
          _id: 1,
          vPlanName: 1,
          iOldPrice: 1,
          iPrice: 1,
          iDatabaseUnlocks: 1,
          iLiveJObs: 1,
          iOldValidity: 1,
          iValidity: 1,
          vMobileNumber: 1,
          vCompanyName: 1,
          iNumberOfOpenings: 1,
          isDeleted: 1,
          vCreatedBy: 1,
          dtCreatedAt: 1,
        },
      },
      { $sort: { _id: -1 } },
    ];

    let dataList = await dbService.aggregateData("PlanModel", aggregateQuery);
    let totalCount = await dbService.recordsCount("PlanModel", filter);
    if (!dataList) throw new Error(Message.systemError);

    return { data: dataList, iCount: totalCount };
  } catch (error) {
    console.error("listError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
