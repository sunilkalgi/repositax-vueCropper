const express = require("express");
const router = express.Router();

const getImgDetails = require("../controller/getImgDetails.controller");
const upload = require("../middleware/getimage.middleware");

module.exports = (app) => {
  router.post(
    "/getImage",
    upload.single("files"),
    getImgDetails.getImageDetails
  );

  app.use("/", router);
};
