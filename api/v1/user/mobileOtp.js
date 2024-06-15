const { Joi } = require("../../../utils/schemaValidate");

const mobileOtpSchema = Joi.object({
  vMobile: Joi.string().required().label("Mobile"),
  vOtp: Joi.string().required().label("OTP"),
  isAdmin: Joi.boolean().label("isAdmin").default(false),
});

module.exports = mobileOtpSchema;
