const dbService = require("../../utils/dbService");
const { generateRandom } = require("../../utils/generateRandom");
const ObjectId = require("mongodb").ObjectId;

const onLogin = async (entry) => {
  try {
    let {
      body: { vMobile },
    } = entry;

    let condition = {
      vMobile,
      isDeleted: false,
    };

    // generate otp
    const verificationCode = await generateRandom(4, false);
    console.log("verificationCode------>", verificationCode);

    let userData = await dbService.findOneRecord("UserModel", condition);
    if (userData) {
      let updateResponse = await dbService.findOneAndUpdateRecord(
        "UserModel",
        { _id: new ObjectId(userData._id), isDeleted: false },
        { vPhoneOtp: verificationCode },
        {
          returnOriginal: false,
        }
      );
    } else {
      const userData = await dbService.createOneRecord("UserModel", {
        vMobile,
        vPhoneOtp: verificationCode,
        dtCreatedAt: Date.now(),
      });
    }

    return { vPhoneOtp: verificationCode };
  } catch (error) {
    console.error("onLoginError ----------->", error);
    throw new Error(error?.message);
  }
};
module.exports = onLogin;
