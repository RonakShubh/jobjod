const { Router } = require("express");
const commonResolver = require("../../../utils/commonResolver");
const multer = require("multer");
const router = new Router();

// SCHEMA
const saveSchema = require("./save");
const updateSchema = require("./update");
const deleteSchema = require("./delete");
const getDetailSchema = require("./getDetails");
const listSchema = require("./list");

// SERVICES
const save = require("../../../services/poster/save");
const list = require("../../../services/poster/list");
const getDetails = require("../../../services/poster/getDetails");
const update = require("../../../services/poster/update");
const deletePoster = require("../../../services/poster/delete");

// Upload Image
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/image");
  },
  filename: function (req, file, cb) {
    let d = new Date();
    let n = d.getTime();
    let fileName = "poster-" + n + "-" + file.originalname;
    cb(null, fileName);
  },
});
const imageUpload = multer({ storage: storage });

router.post(
  "/details",
  imageUpload.array("arrPosterImage", 10),
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
  imageUpload.array("arrPosterImage", 10),
  commonResolver.bind({
    modelService: update,
    isRequestValidateRequired: true,
    schemaValidate: updateSchema,
  })
);

router.delete(
  "/details",
  commonResolver.bind({
    modelService: deletePoster,
    isRequestValidateRequired: true,
    schemaValidate: deleteSchema,
  })
);

module.exports = router;
