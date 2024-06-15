const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vPlanId: Joi.string().required().label("Plan Id"),
  vPlanName: Joi.string().required().label("Plan Name").trim(),
  iOldPrice: Joi.number().label("Old Price").allow(""),
  iPrice: Joi.number().required().label("Price"),
  iDatabaseUnlocks: Joi.number().required().label("Database Unlocks"),
  iLiveJObs: Joi.number().required().label("Live JObs"),
  iOldValidity: Joi.number().label("Old Validity").allow(""),
  iValidity: Joi.number().required().label("Validity"),
  vMobileNumber: Joi.string().label("Mobile Number").allow(""),
  vCompanyName: Joi.string().label("Company Name").allow(""),
  iNumberOfOpenings: Joi.number().label("Number Of Openings").allow(""),
});

module.exports = updateSchema;
