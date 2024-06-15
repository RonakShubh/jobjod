const { Joi } = require("../../../utils/schemaValidate");

const getDetailSchema = Joi.object({
  vPlanId: Joi.string().required().label("Plan Id"),
});

module.exports = getDetailSchema;
