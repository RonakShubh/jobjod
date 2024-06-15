const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vTitle: Joi.string().required().label("Title").trim(),
  vDescription: Joi.string().label("Description").allow(""),
});

module.exports = saveSchema;
