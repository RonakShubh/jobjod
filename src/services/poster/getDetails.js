const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");

const getDetails = async (entry) => {
  try {
    let {
      body: { vPosterId },
    } = entry;

    let filter = {
      isDeleted: false,
      _id: new ObjectId(vPosterId),
    };

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
          vTitle: 1,
          arrPosterImage: 1,
          vDescription: 1,
          vCreatedByName: "$usersData.vName",
          vCreatedBy: 1,
          dtCreatedAt: 1,
        },
      },
      { $sort: { _id: -1 } },
    ];

    let dataList = await dbService.aggregateData("PosterModel", aggregateQuery);

    let result = {};
    if (dataList[0]) {
      result = dataList[0];
    }

    return result;
  } catch (error) {
    console.error("listError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = getDetails;
