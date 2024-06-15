const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vNotificationId: Joi.string().label("Notification Id").allow(""),
  isReadSingle: Joi.boolean().default(false).label("Read Single"),
  isReadAll: Joi.boolean().default(false).label("Read All"),
});

module.exports = updateSchema;
