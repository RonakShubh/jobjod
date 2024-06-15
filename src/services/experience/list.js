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
        { arrDepartment: { $elemMatch: { vDepartmentName: regex } } },
      ];
    }

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
      {
        $project: {
          _id: 1,
          arrCategoryRole: 1,
          arrDepartment: 1,
          vCreatedBy: 1,
          vCreatedByName: "$usersData.vName",
          dtCreatedAt: 1,
        },
      },
      { $sort: { _id: -1 } },
    ];

    let dataList = await dbService.aggregateData(
      "ExperienceModel",
      aggregateQuery
    );
    let totalCount = await dbService.recordsCount("ExperienceModel", filter);
    if (!dataList) throw new Error(Message.systemError);

    return { data: dataList, iCount: totalCount };
  } catch (error) {
    console.error("listError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = list;
