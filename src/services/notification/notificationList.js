const dbService = require("../../utils/dbService");
const ObjectId = require("mongodb").ObjectId;

const notificationList = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vTopic },
    } = entry;

    let filter = {
      isDeleted: false,
      vTopic,
    };

    let aggregateQuery = [
      {
        $match: filter,
      },
      {
        $unwind: {
          path: "$arrUserNotification",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "arrUserNotification.isDeleted": false,
          "arrUserNotification.vUserId": new ObjectId(userId),
        },
      },
      {
        $project: {
          _id: 1,
          vTitle: 1,
          vMessage: 1,
          isRead: "$arrUserNotification.isRead",
          // vTopic: 1,
          dtCreatedAt: 1,
        },
      },
      { $sort: { _id: -1 } },
    ];
    let dataList = await dbService.aggregateData(
      "NotificationModel",
      aggregateQuery
    );
    let totalCount = await dbService.recordsCount("NotificationModel", filter);

    return { data: dataList, iCount: totalCount };
  } catch (error) {
    console.error("notificationListError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = notificationList;
