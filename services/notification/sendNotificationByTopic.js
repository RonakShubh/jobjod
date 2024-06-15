const dbService = require("../../utils/dbService");
const admin = require("../../firebase-config");

const sendNotificationByTopic = async (entry) => {
  try {
    let {
      body: { vTitle, vMessage, vTopic },
    } = entry;

    var message = {
      notification: {
        title: vTitle,
        body: vMessage,
      },
      topic: vTopic,
    };

    // let message = {
    //   android: {
    //     notification: {
    //       title: vTitle,
    //       body: vMessage,
    //     },
    //   },
    //   token: vRegistrationToken,
    // };

    let allUserData = await dbService.findAllRecords(
      "UserModel",
      {
        isDeleted: false,
      },
      {
        _id: 1,
      }
    );

    let userListArray = [];
    if (allUserData.length > 0) {
      allUserData.forEach((element) => {
        if (element) {
          let obj = {
            vUserId: element?._id,
            isRead: false,
            isDeleted: false,
          };
          userListArray.push(obj);
        }
      });
    }

    admin
      .messaging()
      .send(message)
      .then(function (response) {
        let saveData = {
          vTitle,
          vMessage,
          vTopic,
          arrUserNotification: userListArray,
          dtCreatedAt: Date.now(),
        };
        dbService.createOneRecord("NotificationModel", saveData);
        return response;
      })
      .catch(function (error) {
        throw new Error(error);
      });

    return {};
  } catch (error) {
    console.error("sendNotificationByTopicError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = sendNotificationByTopic;
