const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const deletePlan = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vPlanId },
    } = entry;

    let condition = {
      _id: new ObjectId(vPlanId),
      isDeleted: false,
    };

    let checkData = await dbService.findOneRecord("PlanModel", condition, {
      _id: 1,
    });
    if (!checkData?._id) throw new Error(Message.recordNotFound);

    let updateData = {
      isDeleted: true,
      dtDeletedAt: Date.now(),
    };

    let updateResponse = await dbService.findOneAndUpdateRecord(
      "PlanModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );
    if (!updateResponse) throw new Error(Message.systemError);

    return [];
  } catch (error) {
    console.error("deletePlanError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = deletePlan;
