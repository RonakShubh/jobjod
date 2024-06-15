const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
const router = new Router();

// SCHEMA
const saveSchema = require("./save");

// SERVICES
const sendMessage = require("../../../services/chat/sendMessage");

router.post(
  "/sendMessage",
  commonResolver.bind({
    modelService: sendMessage,
    isRequestValidateRequired: false,
  })
);

module.exports = router;
