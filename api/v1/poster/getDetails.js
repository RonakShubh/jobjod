const { Joi } = require("../../../utils/schemaValidate");

const getDetailSchema = Joi.object({
  vPosterId: Joi.string().required().label("Poster Id"),
});

module.exports = getDetailSchema;
