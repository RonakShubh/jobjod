const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
const router = new Router();

// SCHEMA
const saveSchema = require("./save");
const updateSchema = require("./update");
const deleteSchema = require("./delete");
const getDetailSchema = require("./getDetails");
const listSchema = require("./list");

// SERVICES
const save = require("../../../services/education/save");
const list = require("../../../services/education/list");
const getDetails = require("../../../services/education/getDetails");
const update = require("../../../services/education/update");
const deleteEducation = require("../../../services/education/delete");

router.post(
  "/details",
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
  commonResolver.bind({
    modelService: update,
    isRequestValidateRequired: true,
    schemaValidate: updateSchema,
  })
);

router.delete(
  "/details",
  commonResolver.bind({
    modelService: deleteEducation,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,
  })
);

module.exports = router;
