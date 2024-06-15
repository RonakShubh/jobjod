const { Joi } = require("../../../utils/schemaValidate");

const listSchema = Joi.object({
  vSearchText: Joi.string().label("searchText").allow(""),
});

module.exports = listSchema;
