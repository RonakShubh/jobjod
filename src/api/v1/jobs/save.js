const { Joi } = require("../../../utils/schemaValidate");

const saveSchema = Joi.object({
  vJobTitle: Joi.string().required().label("Job Title").trim(),
  vCategory: Joi.string().label("Category").allow(""),
  vLocation: Joi.string().required().label("Location").trim(),
  iMinSalary: Joi.number().required().label("Min Salary"),
  iMaxSalary: Joi.number().required().label("Max Salary"),
  vMonthlyBonus: Joi.string().label("Monthly Bonus").allow(""),
  vBonusType: Joi.string().label("Bonus Type").allow(""),
  iBonusAmount: Joi.number().label("Bonus Amount").allow(""),
  vMinExperience: Joi.string().required().label("Min Experience").trim(),
  vMaxExperience: Joi.string().required().label("Max Experience").trim(),
  vCandidateQualification: Joi.string().label("Qualification").allow(""),
  vGenderHire: Joi.string().label("Gender Hire").allow(""),
  iCandidateArea: Joi.number().label("Candidate Area").default(0),
  vWorkPlace: Joi.string().required().label("Work Place").trim(),
  iCandidateCallTime: Joi.number().label("Candidate Call Time").default(0),
  iVacancies: Joi.number().label("Vacancies").allow(""),
  vEmploymentType: Joi.string().required().label("Employment Type").trim(),
  vWorkTimings: Joi.string().label("Work Timings").allow(""),
  vInterviewSchedule: Joi.string().label("Interview Schedule").allow(""),
  arrSkills: Joi.array().items(),
  vDescription: Joi.string().label("Description").allow(""),
  isNewJob: Joi.boolean().label("New Job").default(false),
  isJobVerified: Joi.boolean().label("Job Verified").default(false),
  vLatitude: Joi.string().label("Latitude").allow(""),
  vLongitude: Joi.string().label("Longitude").allow(""),
});

module.exports = saveSchema;
