const { Joi } = require("../../../utils/schemaValidate");

const getDetailSchema = Joi.object({
  vJobId: Joi.string().required().label("Job Id"),
});

module.exports = getDetailSchema;
