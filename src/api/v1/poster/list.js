const { Joi } = require("../../../utils/schemaValidate");

const listSchema = Joi.object({
  vSearchText: Joi.string().label("Search Text").allow(""),
});

module.exports = listSchema;
