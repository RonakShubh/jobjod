const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const update = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vPosterId },
      files,
    } = entry;

    let condition = {
      _id: new ObjectId(vPosterId),
      isDeleted: false,
    };

    let checkData = await dbService.findOneRecord("PosterModel", condition, {
      _id: 1,
      arrPosterImage: 1,
    });
    if (!checkData?._id) throw new Error(Message.recordNotFound);

    let posterImageArray = checkData?.arrPosterImage;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        let newImageArray = "image/" + files[i].filename;
        posterImageArray = posterImageArray.concat(newImageArray);
      }
    }

    let updateData = {
      ...entry.body,
      arrPosterImage: posterImageArray,
      isUpdated: true,
      dtUpdatedAt: Date.now(),
      vUpdatedBy: new ObjectId(userId),
    };

    let updateResponse = await dbService.findOneAndUpdateRecord(
      "PosterModel",
      condition,
      updateData,
      {
        returnOriginal: false,
      }
    );
    if (!updateResponse) throw new Error(Message.systemError);

    return updateResponse;
  } catch (error) {
    console.error("updateError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = update;
