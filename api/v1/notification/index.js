const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();

// SCHEMA
const sendByFireBaseSchema = require("./sendNotificationByFireBase");
const listByNotificationSchema = require("./listNotification");
const updateSchema = require("./update");
const deleteSchema = require("./delete");

// SERVICES
const sendNotificationByTopic = require("../../../services/notification/sendNotificationByTopic");
const notificationList = require("../../../services/notification/notificationList");
const notificationUpdate = require("../../../services/notification/notificationUpdate");
const notificationDelete = require("../../../services/notification/notificationDelete");

router.post(
  "/details",
  commonResolver.bind({
    modelService: sendNotificationByTopic,
    isRequestValidateRequired: true,
    schemaValidate: sendByFireBaseSchema,
  })
);

router.get(
  "/details",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: notificationList,
    isRequestValidateRequired: true,
    schemaValidate: listByNotificationSchema,
  })
);

router.put(
  "/details",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: notificationUpdate,
    isRequestValidateRequired: true,
    schemaValidate: updateSchema,
  })
);

router.delete(
  "/details",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: notificationDelete,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,
  })
);

module.exports = router;
