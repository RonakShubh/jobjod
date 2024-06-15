const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  vExperienceId: Joi.string().required().label("Experience Id"),
});

module.exports = deleteSchema;
