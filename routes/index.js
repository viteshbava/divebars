const express = require("express");
const router = express.Router();
const index = require("../controllers/index");

router.get("/", index.renderHome);

// CATCH ALL
router.all("*", index.pageNotFound);

module.exports = router;
