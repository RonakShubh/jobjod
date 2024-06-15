const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  vEducationId: Joi.string().required().label("Education Id"),
});

module.exports = deleteSchema;
