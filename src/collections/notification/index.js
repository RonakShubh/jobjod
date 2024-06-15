const mongoose = require("mongoose");

const userNotificationSchema = mongoose.Schema(
  {
    vUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User Id" },
    isRead: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
  },
  { _id: false }
);

const notificationSchema = new mongoose.Schema({
  vTitle: { type: String },
  vMessage: { type: String },
  vTopic: { type: String },
  arrUserNotification: [userNotificationSchema],
  isDeleted: { type: Boolean, default: false },
  vCreatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Created By" },
  vUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Updated By" },
  dtCreatedAt: Number,
  dtDeletedAt: Number,
  isUpdated: Boolean,
  dtUpdatedAt: Number,
});

module.exports = mongoose.model("tblNotification", notificationSchema);
