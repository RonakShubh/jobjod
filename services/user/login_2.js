const dbService = require("../../utils/dbService");
const { generateRandom } = require("../../utils/generateRandom");
const ObjectId = require("mongodb").ObjectId;
const { sendOTPBySendChamp } = require("../../utils/generateOtpAndSMS");

const onLogin_2 = async (entry) => {
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

    let smsBody = {
      message: "Your verification code is " + verificationCode,
      mobileNumber: vMobile,
    };

    let smsAPI = await sendOTPBySendChamp(smsBody);
    // console.log("smsAPI-----1111111111111111---->", smsAPI);
    console.log("data--------->", smsAPI.data);

    // let userData = await dbService.findOneRecord("UserModel", condition);
    // if (userData) {
    //   let updateResponse = await dbService.findOneAndUpdateRecord(
    //     "UserModel",
    //     { _id: new ObjectId(userData._id), isDeleted: false },
    //     { vPhoneOtp: verificationCode },
    //     {
    //       returnOriginal: false,
    //     }
    //   );
    // } else {
    //   const userData = await dbService.createOneRecord("UserModel", {
    //     vMobile,
    //     vPhoneOtp: verificationCode,
    //     dtCreatedAt: Date.now(),
    //   });
    // }

    return { vPhoneOtp: verificationCode };
  } catch (error) {
    console.error("onLogin_2Error ----------->", error);
    throw new Error(error?.message);
  }
};
module.exports = onLogin_2;
