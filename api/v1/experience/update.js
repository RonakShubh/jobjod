const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vExperienceId: Joi.string().required().label("Experience Id"),
  arrCategoryRole: Joi.array().items(),
  arrDepartment: Joi.array().items(
    Joi.object().keys({
      vDepartmentName: Joi.string().label("Department Name").allow(""),
      arrIndustry: Joi.array().items(),
    })
  ),
});

module.exports = updateSchema;
