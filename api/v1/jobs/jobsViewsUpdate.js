const { Joi } = require("../../../utils/schemaValidate");

const jobsViewsUpdateSchema = Joi.object({
  vJobId: Joi.string().required().label("Job Id"),
  isLiveJob: Joi.boolean().label("Live Jobs").allow(""),
  isViews: Joi.boolean().label("jobs Views").default(false),
  isCallConnect: Joi.boolean().label("Call Connect").default(false),
  isUnlocks: Joi.boolean().label("Unlocks").default(false),
  isHiring: Joi.boolean().label("Hiring").default(false),
});

module.exports = jobsViewsUpdateSchema;
