const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  vChatId: { type: String, required: true },
  vFrom: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "from" },
  vTo: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "to" },
  vMessage: { type: String, required: true },
  isTriedToGet: { type: Boolean, default: false, select: false },
  dtSendAt: { type: Number, default: Date.now },
  isDeleted: { type: Boolean, default: false },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
});

module.exports = mongoose.model("tblMessage", MessageSchema);
