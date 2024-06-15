const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  vMessageId: Joi.string().required().label("Message Id"),
});

module.exports = deleteSchema;
