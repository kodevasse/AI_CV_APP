const express = require("express");
const {
  generateImage,
  generateText,
  // generateImportantPoints,
  // generateJobApplication,
} = require("../controllers/openaiController");
const router = express.Router();

router.post("/generateimage", generateImage);
router.post("/generatetext", generateText);
// router.post("/generateImportantPoints", generateImportantPoints);
// router.post("/generateJobApplication", generateJobApplication);

module.exports = router;
