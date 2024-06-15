const { Joi } = require("../../../utils/schemaValidate");

const userListSchema = Joi.object({
  vSearchText: Joi.string().label("searchText").allow(""),
  isCompany: Joi.boolean().label("Company").default(false),
});

module.exports = userListSchema;
