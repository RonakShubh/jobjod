const ObjectId = require("mongodb").ObjectId;
const dbService = require("../../utils/dbService");
const Message = require("../../utils/messages");

const save = async (entry) => {
  try {
    let {
      user: { _id: userId },
      body: { vTitle, vDescription },
      files,
    } = entry;

    let posterImageArray = [];
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        posterImageArray.push("image/" + files[i].filename);
      }
    }

    let payload = {
      vTitle,
      vDescription,
      arrPosterImage: posterImageArray,
      vCreatedBy: new ObjectId(userId),
      dtCreatedAt: Date.now(),
    };

    const saveData = await dbService.createOneRecord("PosterModel", payload);
    if (!saveData) throw new Error(Message.systemError);

    let result = {
      vTitle: saveData?.vTitle,
      arrPosterImage: saveData?.arrPosterImage,
      vDescription: saveData?.vDescription,
      vCreatedBy: saveData?.vCreatedBy,
      dtCreatedAt: saveData?.dtCreatedAt,
    };

    return result;
  } catch (error) {
    console.error("saveError ----------->", error);
    throw new Error(error?.message);
  }
};

module.exports = save;
