const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  vJobTitle: { type: String, default: "" },
  vCategory: { type: String, default: "" },
  vLocation: { type: String, default: "" },
  iMinSalary: { type: Number, default: 0 },
  iMaxSalary: { type: Number, default: 0 },
  vMonthlyBonus: { type: String, default: "" },
  vBonusType: { type: String, default: "" },
  iBonusAmount: { type: Number, default: 0 },
  vMinExperience: { type: String, default: "" },
  vMaxExperience: { type: String, default: "" },
  vCandidateQualification: { type: String, default: "" },
  vGenderHire: { type: String, default: "" },
  iCandidateArea: { type: Number, default: 0 }, // 0 : Nearby areas ( uo to 10 km) , 1 : Anywhere in the city
  vWorkPlace: { type: String, default: "" },
  iCandidateCallTime: { type: Number, default: 0 }, // 0 : Everyday, 1 : Monday to Friday, 2 : Custom, 3 : Monday to Saturday
  iVacancies: { type: Number, default: 0 },
  vEmploymentType: { type: String, default: "" },
  vWorkTimings: { type: String, default: "" },
  vInterviewSchedule: { type: String, default: "" },
  arrSkills: [],
  vDescription: { type: String, default: "" },
  vLatitude: { type: String, default: "" },
  vLongitude: { type: String, default: "" },
  isNewJob: { type: Boolean, default: false },
  isJobVerified: { type: Boolean, default: false },
  isJobLive: { type: Boolean, default: false },
  arrJobViews: [],
  arrCallConnected: [],
  arrJobUnlocks: [],
  isHiringCompleted: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tblJobs", jobSchema);
