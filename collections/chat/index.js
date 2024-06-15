const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  vSenderId: { type: mongoose.Schema.Types.ObjectId, ref: "Sender Id" },
  vReceiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Receiver Id" },
  vMessage: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tblChat", chatSchema);
