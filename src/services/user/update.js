const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const update = async (entry) => {
  try {
    let {
      user: { _id: loginUserId },
      body: { vUserId },
      files,
    } = entry;

    let condition = {
      _id: new ObjectId(vUserId),
      isDeleted: false,
    };

    let userData = await dbService.findOneRecord("UserModel", condition, {
      _id: 1,
      vProfileImage: 1,
      vResumeFile: 1,
    });
    if (!userData?._id) throw new Error(Message.recordNotFound);

    let profileUrlImage = userData?.vProfileImage
      ? userData?.vProfileImage
      : "";
    let resumeFileUrl = userData?.vResumeFile ? userData?.vResumeFile : "";

    if (Object.keys(files).length > 0) {
      if (
        files?.vProfileImage &&
        Object.keys(files?.vProfileImage[0]).length > 0
      ) {
        profileUrlImage = "image/" + files?.vProfileImage[0].filename;
      }
      if (files?.vResumeFile && Object.keys(files?.vResumeFile[0]).length > 0) {
        resumeFileUrl = "image/" + files?.vResumeFile[0].filename;
      }
    }

    let payload = {
      ...entry.body,
      vProfileImage: profileUrlImage,
      vResumeFile: resumeFileUrl,
      isUpdated: true,
      dtUpdatedAt: Date.now(),
      vUpdatedBy: new ObjectId(loginUserId),
    };

    let updateResponse = await dbService.updateOneRecords(
      "UserModel",
      condition,
      payload,
      {
        returnOriginal: false,
      }
    );
    if (!updateResponse) throw new Error(Message.systemError);

    return {
      _id: updateResponse?._id,
      vName: updateResponse?.vName,
      vEmail: updateResponse?.vEmail,
    };
  } catch (error) {
    console.error("updateError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
