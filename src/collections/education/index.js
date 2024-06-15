const mongoose = require("mongoose");

const degreeSchema = mongoose.Schema(
  {
    vDegreeName: { type: String, default: "" },
    arrSpecisation: [],
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema({
  vHighestEducationName: { type: String, default: "" },
  arrDegree: [degreeSchema],
  isDeleted: { type: Boolean, default: false },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tblEducation", educationSchema);
