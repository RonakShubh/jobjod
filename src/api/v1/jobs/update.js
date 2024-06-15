const { Joi } = require("../../../utils/schemaValidate");

const updateSchema = Joi.object({
  vJobId: Joi.string().required().label("Job Id"),
  vJobTitle: Joi.string().label("Job Title").allow(""),
  vCategory: Joi.string().label("Category").allow(""),
  vLocation: Joi.string().label("Location").allow(""),
  iMinSalary: Joi.number().label("Min Salary").allow(""),
  iMaxSalary: Joi.number().label("Max Salary").allow(""),
  vMonthlyBonus: Joi.string().label("Monthly Bonus").allow(""),
  vBonusType: Joi.string().label("Bonus Type").allow(""),
  iBonusAmount: Joi.number().label("Bonus Amount").allow(""),
  vMinExperience: Joi.string().label("Min Experience").allow(""),
  vMaxExperience: Joi.string().label("Max Experience").allow(""),
  vCandidateQualification: Joi.string().label("Qualification").allow(""),
  vGenderHire: Joi.string().label("Gender Hire").allow(""),
  iCandidateArea: Joi.number().label("Candidate Area").default(0),
  vWorkPlace: Joi.string().label("Work Place").allow(""),
  iCandidateCallTime: Joi.number().label("Candidate Call Time").default(0),
  iVacancies: Joi.number().label("Vacancies").allow(""),
  vEmploymentType: Joi.string().label("Employment Type").allow(""),
  vWorkTimings: Joi.string().label("Work Timings").allow(""),
  vInterviewSchedule: Joi.string().label("Interview Schedule").allow(""),
  arrSkills: Joi.array().items(),
  vDescription: Joi.string().label("Description").allow(""),
  isNewJob: Joi.boolean().label("New Job").default(false),
  isJobVerified: Joi.boolean().label("Job Verified").default(false),
  vLatitude: Joi.string().label("Latitude").allow(""),
  vLongitude: Joi.string().label("Longitude").allow(""),
});

module.exports = updateSchema;
