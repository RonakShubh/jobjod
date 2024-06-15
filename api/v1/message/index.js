const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();

// SCHEMA
const saveSchema = require("./save");
const deleteSchema = require("./delete");

// SERVICES
const sendMessage = require("../../../services/message/sendMessage");
const list = require("../../../services/message/list");
const deleteReceivedMessages = require("../../../services/message/deleteReceivedMessages");
const deleteMessage = require("../../../services/message/delete");

router.post(
  "/sendMessage",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: sendMessage,
    isRequestValidateRequired: true,
    schemaValidate: saveSchema,
  })
);

router.get(
  "/getMessage",
  commonResolver.bind({
    modelService: list,
    isRequestValidateRequired: false,
  })
);

router.delete(
  "/deleteReceivedMessages",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: deleteReceivedMessages,
    isRequestValidateRequired: false,
  })
);

router.delete(
  "/deleteMessage",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: deleteMessage,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,
  })
);

module.exports = router;
