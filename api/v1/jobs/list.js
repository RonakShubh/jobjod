const { Joi } = require("../../../utils/schemaValidate");

const listSchema = Joi.object({
  vSearchText: Joi.string().label("Search Text").allow(""),
  vSortBy: Joi.string().label("Sort By").allow(""),
  iMinSalary: Joi.number().label("Min Salary").allow(""),
  iMaxSalary: Joi.number().label("Max Salary").allow(""),
  iDistance: Joi.number().label("Distance").allow(""),
  vSector: Joi.string().label("Sector").allow(""),
  vPostedIn: Joi.string().label("posted in").allow(""),
  vJobType: Joi.string().label("Job Type").allow(""),
  iPage: Joi.number().min(1).label("Page").default(1),
  iLimit: Joi.number().min(1).label("Limit").default(10),
  isJobLive: Joi.boolean().label("Job Live").default(false),
  isHiringCompleted: Joi.boolean().label("Hiring Completed").default(false),
  arrJobViews: Joi.array().items(),
  arrCallConnected: Joi.array().items(),
  arrJobUnlocks: Joi.array().items(),
});

module.exports = listSchema;
