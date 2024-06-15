const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  vName: { type: String, default: "" },
  vEmail: { type: String, default: "" },
  vProfileImage: { type: String, default: "" },
  vMobile: { type: String, required: true },
  vPhoneOtp: { type: String, default: "" },
  vLanguage: { type: String, default: "" },
  dtBirthDate: { type: Number, default: 0 },
  vGender: { type: String, default: "" },
  vAddress: { type: String, default: "" },
  vHighestEducation: { type: String, default: "" },
  vDegree: { type: String, default: "" },
  vSpecisation: { type: String, default: "" },
  vCollegeName: { type: String, default: "" },
  vEducationType: { type: String, default: "" },
  vWorkExperience: { type: String, default: "" },
  objTotalYearsExperience: {
    vYears: { type: String, default: "" },
    vMonths: { type: String, default: "" },
  },
  vJobTitle: { type: String, default: "" },
  vDepartment: { type: String, default: "" },
  vCategoryOrRole: { type: String, default: "" },
  vCompanyName: { type: String, default: "" },
  vContactPerson: { type: String, default: "" },
  vIndustryName: { type: String, default: "" },
  arrSkills: [],
  vCurrentlyWorking: { type: String, default: "" },
  dtStartDate: { type: Number, default: 0 },
  iCurrentSalary: { type: Number, default: 0 },
  iExperationSalary: { type: Number, default: 0 },
  vEmploymentType: { type: String, default: "" },
  vNoticePeriod: { type: String, default: "" },
  vEnglishSpeakLevel: { type: String, default: "" },
  arrLanguagesSpeak: [],
  objPreferredWorkType: {
    vPreferredEmploymentType: { type: String, default: "" },
    vPreferredWorkPlace: { type: String, default: "" },
    vPreferredShift: { type: String, default: "" },
    arrPreferredCity: [],
  },
  vResumeFile: { type: String, default: "" },
  iWalletBalance: { type: Number, default: 0 },
  vPaymentId: { type: String, default: "" },
  vPlanId: { type: mongoose.Schema.Types.ObjectId, ref: "Plan Id" },
  vEstablishedYear: { type: String, default: "" },
  vIndustryType: { type: String, default: "" },
  vPerksOrBenefits: { type: String, default: "" },
  vInterviewAddress: { type: String, default: "" },
  iTotalEmployees: { type: Number, default: 0 },
  vLatitude: { type: String, default: "" },
  vLongitude: { type: String, default: "" },
  isUserOnline: { type: Boolean, default: false },
  isCompany: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  vLoginToken: { type: String },
  dtLastLoginDate: Number,
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tblUser", userSchema);