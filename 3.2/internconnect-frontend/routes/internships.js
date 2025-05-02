const express = require("express");
const router = express.Router();
const controller = require("../controllers/internshipController");

router.post("/", controller.createInternship);
router.get("/", controller.getAllInternships);

module.exports = router;
