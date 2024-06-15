const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  vJobId: Joi.string().required().label("Job Id"),
});

module.exports = deleteSchema;
