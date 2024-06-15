const mongoose = require("mongoose");

const posterSchema = new mongoose.Schema({
  vTitle: { type: String, default: "" },
  arrPosterImage: [],
  vDescription: { type: String, default: "" },
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tblPoster", posterSchema);
