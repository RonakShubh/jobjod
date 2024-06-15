const axios = require("axios");

const sendOTPBySendChamp = async ({ message, mobileNumber }, res) => {
  console.log("message--------->", message);
  console.log("mobileNumber--------->", mobileNumber);

  const AUTH_KEY = "2bda1a6a1bcfcf5338129af093c32d4";
  const senderId = "JYNSMS";

  const smsAPI2 =
    "http://msg.icloudsms.com/rest/services/sendSMS/sendGroupSms?AUTH_KEY=" +
    AUTH_KEY +
    "&message=" +
    message +
    "&senderId=" +
    senderId +
    "&routeId=1&mobileNos=" +
    mobileNumber +
    "&smsContentType=english&entityid=NoneedIfAddedInPanel&tmid=140200000022&templateid=NoneedIfAddedInPanel&concentFailoverId=30";

  const smsAPI =
    "https://sms.jiyaninfosoft.com/rest/services/sendSMS/sendGroupSms?AUTH_KEY=" +
    AUTH_KEY +
    "&message=" +
    message +
    "&senderId=" +
    senderId +
    "&routeId=1&mobileNos=" +
    mobileNumber +
    "&smsContentType=english";

  console.log("smsAPI---00000000000------>", smsAPI);
  // console.log("smsAPI2---00000000000------>", smsAPI2);

  let request_options1 = {
    method: "get",
    url: smsAPI,
  };
  // let otpResponse = await axios(request_options1);
  return axios.post(smsAPI, {});
  // console.log("otpResponse--------->", otpResponse);
  console.log("data--------->", otpResponse.data);
  return otpResponse.data;
};

module.exports = { sendOTPBySendChamp };
