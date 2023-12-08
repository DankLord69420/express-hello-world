const express = require("express");
const router = express.Router();

const touroController = require("../controllers/touroController");

router.get("/touro/list", touroController.list);


module.exports = router;