const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
const userAuthentication = require("../../../middleware/authentication/userAuthentication");
const router = new Router();

// SCHEMA
const saveSchema = require("./save");
const updateSchema = require("./update");
const deleteSchema = require("./delete");
const getDetailSchema = require("./getDetails");
const listSchema = require("./list");

// SERVICES
const save = require("../../../services/plan/save");
const list = require("../../../services/plan/list");
const getDetails = require("../../../services/plan/getDetails");
const update = require("../../../services/plan/update");
const deletePlan = require("../../../services/plan/delete");

router.post(
  "/details",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: save,
    isRequestValidateRequired: true,
    schemaValidate: saveSchema,
  })
);

router.get(
  "/details",
  commonResolver.bind({
    modelService: list,
    isRequestValidateRequired: true,
    schemaValidate: listSchema,
  })
);

router.get(
  "/getDetails",
  commonResolver.bind({
    modelService: getDetails,
    isRequestValidateRequired: true,
    schemaValidate: getDetailSchema,
  })
);

router.put(
  "/details",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: update,
    isRequestValidateRequired: true,
    schemaValidate: updateSchema,
  })
);

router.delete(
  "/details",
  userAuthentication.bind({}),
  commonResolver.bind({
    modelService: deletePlan,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,
  })
);

module.exports = router;
