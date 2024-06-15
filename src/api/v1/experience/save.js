const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  arrCategoryRole: Joi.array().items(),
  arrDepartment: Joi.array().items(
    Joi.object().keys({
      vDepartmentName: Joi.string().label("Department Name").allow(""),
      arrIndustry: Joi.array().items(),
    })
  ),
});

module.exports = saveSchema;
