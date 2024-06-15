const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vHighestEducationName: Joi.string()
    .required()
    .label("Highest Education Name")
    .trim(),
  arrDegree: Joi.array().items(
    Joi.object().keys({
      vDegreeName: Joi.string().label("Degree Name").allow(""),
      arrSpecisation: Joi.array().items(),
    })
  ),
});

module.exports = saveSchema;
