const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const jobsViewsUpdate = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: {
        vJobId,
        isLiveJob,
        isViews,
        isCallConnect,
        isUnlocks,
        isHiring = false,
      },
    } = entry;

    let condition = {
      _id: new ObjectId(vJobId),
      isDeleted: false,
    };

    let jobDetails = await dbService.findOneRecord("JobsModel", condition, {
      _id: 1,
      isLiveJob: 1,
      isHiringCompleted: 1,
    });
    if (!jobDetails?._id) throw new Error(Message.recordNotFound);

    let updateData = {};
    if (isLiveJob != undefined) {
      updateData["isJobLive"] = isLiveJob;
    }
    if (isHiring != undefined) {
      updateData["isHiringCompleted"] = isHiring;
    }
    if (isViews) {
      updateData = {
        ...updateData,
        $push: { arrJobViews: userId },
      };
    }
    if (isCallConnect) {
      updateData = {
        ...updateData,
        $push: { arrCallConnected: userId },
      };
    }
    if (isUnlocks) {
      updateData = {
        ...updateData,
        $push: { arrJobUnlocks: userId },
      };
    }

    let updateResponse = await dbService.findOneAndUpdateRecord(
      "JobsModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );
    if (!updateResponse) throw new Error(Message.systemError);

    return updateResponse;
  } catch (error) {
    console.error("jobsViewsUpdateError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = jobsViewsUpdate;
