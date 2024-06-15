const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema(
  {
    vDepartmentName: { type: String, default: "" },
    arrIndustry: [],
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema({
  arrCategoryRole: [],
  arrDepartment: [departmentSchema],
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tblExperience", experienceSchema);
