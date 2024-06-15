const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  vPlanName: { type: String, default: "" },
  iOldPrice: { type: Number, default: 0 },
  iPrice: { type: Number, default: 0 },
  iDatabaseUnlocks: { type: Number, default: 0 },
  iLiveJObs: { type: Number, default: 0 },
  iOldValidity: { type: Number, default: 0 },
  iValidity: { type: Number, default: 0 },
  vMobileNumber: { type: String, default: "" },
  vCompanyName: { type: String, default: "" },
  iNumberOfOpenings: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tblPlan", planSchema);
