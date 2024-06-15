const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
const router = new Router();

// SCHEMA
const saveSchema = require("./save");
const updateSchema = require("./update");
const deleteSchema = require("./delete");
const getDetailSchema = require("./getDetails");
const listSchema = require("./list");
const jobsViewsUpdateSchema = require("./jobsViewsUpdate");
const jobTotalCountSchema = require("./jobTotalCount");

// SERVICES
const save = require("../../../services/jobs/save");
const list = require("../../../services/jobs/list");
const getDetails = require("../../../services/jobs/getDetails");
const update = require("../../../services/jobs/update");
const deleteJob = require("../../../services/jobs/delete");
const jobsViewsUpdate = require("../../../services/jobs/jobsViewsUpdate");
const jobTotalCount = require("../../../services/jobs/jobTotalCount");

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

router.post(
  "/delete",
  commonResolver.bind({
    modelService: deleteJob,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,
  })
);

router.post(
  "/jobsViewsUpdate",
  commonResolver.bind({
    modelService: jobsViewsUpdate,
    isRequestValidateRequired: true,
    schemaValidate: jobsViewsUpdateSchema,
  })
);

router.post(
  "/jobTotalCount",
  commonResolver.bind({
    modelService: jobTotalCount,
    isRequestValidateRequired: true,
    schemaValidate: jobTotalCountSchema,
  })
);

module.exports = router;
