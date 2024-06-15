const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vPlanName: Joi.string().required().label("Plan Name").trim(),
  iOldPrice: Joi.number().label("Old Price").default(0),
  iPrice: Joi.number().required().label("Price"),
  iDatabaseUnlocks: Joi.number().required().label("Database Unlocks"),
  iLiveJObs: Joi.number().required().label("Live JObs"),
  iOldValidity: Joi.number().label("Old Validity").default(0),
  iValidity: Joi.number().required().label("Validity"),
  vMobileNumber: Joi.string().label("Mobile Number").allow(""),
  vCompanyName: Joi.string().label("Company Name").allow(""),
  iNumberOfOpenings: Joi.number().label("Number Of Openings").allow(""),
});

module.exports = saveSchema;
