const { Joi } = require("../../../utils/schemaValidate");

const jobTotalCountSchema = Joi.object({
  vStartDate: Joi.string().label("Start Date").allow(""),
  vEndDate: Joi.string().label("End Date").allow(""),
});

module.exports = jobTotalCountSchema;
