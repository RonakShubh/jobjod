const { Joi } = require("../../../utils/schemaValidate");

const sendByFireBaseSchema = Joi.object({
  vTitle: Joi.string().required().label("title").trim(),
  vMessage: Joi.string().required().label("message"),
  vTopic: Joi.string().required().label("Topic"),
  // vRegistrationToken: Joi.string().required().label("Registration Token"),
});

module.exports = sendByFireBaseSchema;
