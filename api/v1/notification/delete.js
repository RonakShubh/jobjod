const { Joi } = require("../../../utils/schemaValidate");

const deleteSchema = Joi.object({
  vNotificationId: Joi.string().label("Notification Id").allow(""),
  isDeleteSingle: Joi.boolean().default(false).label("Delete Single"),
  isDeleteAll: Joi.boolean().default(false).label("Delete All"),
});

module.exports = deleteSchema;
