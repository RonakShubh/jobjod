const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vTo: Joi.string().required().label("To").trim(),
  vMessage: Joi.string().required().label("vMessage").trim(),
});

module.exports = saveSchema;
