const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  vPosterId: Joi.string().required().label("Poster Id"),
});

module.exports = deleteSchema;
