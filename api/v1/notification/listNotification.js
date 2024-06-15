const { Joi } = require("../../../utils/schemaValidate");

const listByNotificationSchema = Joi.object({
  vTopic: Joi.string().required().label("Topic").trim(),
});

module.exports = listByNotificationSchema;
