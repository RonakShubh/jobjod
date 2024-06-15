const { Joi } = require("../../../utils/schemaValidate");

const getDetailSchema = Joi.object({
  vExperienceId: Joi.string().required().label("Experience Id"),
});

module.exports = getDetailSchema;
