const dbService = require("../../utils/dbService");

const jobTotalCount = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vStartDate, vEndDate },
    } = entry;

    let condition = {
      isDeleted: false,
    };

    if (vStartDate && vEndDate) {
      let newStartDate = new Date(vStartDate + "T00:00:00.000Z");
      let newEndDate = new Date(vEndDate + "T23:59:59.000Z");

      condition["dtCreatedAt"] = {
        $gte: newStartDate.getTime(),
        $lte: newEndDate.getTime(),
      };
    }

    let aggregateQuery = [
      {
        $match: condition,
      },
      {
        $group: {
          _id: null,
          totalLiveJob: {
            $sum: { $cond: [{ $eq: ["$isJobLive", true] }, 1, 0] },
          },
          totalJobView: { $sum: { $size: "$arrJobViews" } },
          totalCallConnect: { $sum: { $size: "$arrCallConnected" } },
          totalUnblock: { $sum: { $size: "$arrJobUnlocks" } },
          totalHireComplete: {
            $sum: { $cond: { if: "$isHiringCompleted", then: 1, else: 0 } },
          },
          arrJobViews: { $push: "$arrJobViews" },
          arrCallConnected: { $push: "$arrCallConnected" },
          arrJobUnlocks: { $push: "$arrJobUnlocks" },
        },
      },
      {
        $project: {
          _id: 0,
          totalLiveJob: 1,
          totalJobView: 1,
          totalCallConnect: 1,
          totalUnblock: 1,
          totalHireComplete: 1,
          arrJobViews: {
            $reduce: {
              input: "$arrJobViews",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
          arrCallConnected: {
            $reduce: {
              input: "$arrCallConnected",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
          arrJobUnlocks: {
            $reduce: {
              input: "$arrJobUnlocks",
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
    ];
    let dataList = await dbService.aggregateData("JobsModel", aggregateQuery);

    return dataList[0];
  } catch (error) {
    console.error("jobTotalCountError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = jobTotalCount;
