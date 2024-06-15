const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
const multer = require("multer");
const userAuthentication = require("../../../middleware/authentication/userAuthentication");

const router = new Router();

// SCHEMA
const loginSchema = require("./login");
const mobileOtpSchema = require("./mobileOtp");
const userListSchema = require("./userList");
const updateSchema = require("./update");

// SERVICES
const onLogin = require("../../../services/user/login");
const onLogin_2 = require("../../../services/user/login_2");
const verifyMobileOtp = require("../../../services/user/verifyMobileOtp");
const userList = require("../../../services/user/userList");
const getUserDetails = require("../../../services/user/getUserDetails");
const update = require("../../../services/user/update");

// Upload Image
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image");
  },
  filename: function (req, file, cb) {
    let d = new Date();
    let n = d.getTime();
    let fileName = "user-" + n + "-" + file.originalname;
    cb(null, fileName);
  },
});
const imageUpload = multer({ storage: storage });

router.post(
  "/login_2",
  commonResolver.bind({
    modelService: onLogin_2,
    isRequestValidateRequired: true,
    schemaValidate: loginSchema,
  })
);

router.post(
  "/login",
  commonResolver.bind({
    modelService: onLogin,
    isRequestValidateRequired: true,
    schemaValidate: loginSchema,
  })
);

router.post(
  "/verifyMobileOtp",
  commonResolver.bind({
    modelService: verifyMobileOtp,
    isRequestValidateRequired: true,
    schemaValidate: mobileOtpSchema,
  })
);

router.post(
  "/allUserList",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: userList,
    isRequestValidateRequired: true,
    schemaValidate: userListSchema,
  })
);

router.post(
  "/getUserDetails",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: getUserDetails,
    isRequestValidateRequired: false,
  })
);

router.put(
  "/update",
  imageUpload.fields([
    { name: "vProfileImage", maxCount: 1 },
    { name: "vResumeFile", maxCount: 1 },
  ]),
  commonResolver.bind({
    modelService: update,
    isRequestValidateRequired: true,
    schemaValidate: updateSchema,
  })
);

module.exports = router;
