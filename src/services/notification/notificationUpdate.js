const dbService = require("../../utils/dbService");
const ObjectId = require("mongodb").ObjectId;

const notificationUpdate = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vNotificationId, isReadSingle, isReadAll },
    } = entry;

    let filter = {
      isDeleted: false,
      "arrUserNotification.vUserId": userId,
    };

    if (vNotificationId) {
      let checkData = await dbService.findOneRecord(
        "NotificationModel",
        { _id: new ObjectId(vNotificationId), isDeleted: false },
        {
          _id: 1,
        }
      );
      if (!checkData?._id) throw new Error(Message.recordNotFound);

      filter["_id"] = new ObjectId(vNotificationId);
    }

    if (isReadAll) {
      let updateResponse = await dbService.updateManyRecords(
        "NotificationModel",
        filter,
        { "arrUserNotification.$.isRead": isReadAll },
        {
          returnOriginal: false,
        }
      );
      if (!updateResponse) throw new Error(Message.systemError);
    } else {
      let updateResponse = await dbService.findOneAndUpdateRecord(
        "NotificationModel",
        filter,
        { "arrUserNotification.$.isRead": isReadSingle },
        {
          returnOriginal: false,
        }
      );
      if (!updateResponse) throw new Error(Message.systemError);
    }

    return {};
  } catch (error) {
    console.error("notificationUpdateError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = notificationUpdate;
