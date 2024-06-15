const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vPosterId: Joi.string().required().label("Poster Id"),
  vTitle: Joi.string().label("Title").allow(""),
  vDescription: Joi.string().label("Description").allow(""),
});

module.exports = updateSchema;
