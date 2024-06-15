const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vEducationId: Joi.string().required().label("Education Id"),
  vHighestEducationName: Joi.string().label("Highest Education Name").allow(""),
  arrDegree: Joi.array().items(
    Joi.object().keys({
      vDegreeName: Joi.string().label("Degree Name").allow(""),
      arrSpecisation: Joi.array().items(),
    })
  ),
});

module.exports = updateSchema;
