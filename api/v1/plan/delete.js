const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  vPlanId: Joi.string().required().label("Plan Id"),
});

module.exports = deleteSchema;
