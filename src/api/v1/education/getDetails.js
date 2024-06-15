const { Joi } = require("../../../utils/schemaValidate");

const getDetailSchema = Joi.object({
  vEducationId: Joi.string().required().label("Education Id"),
});

module.exports = getDetailSchema;
