const express = require("express");
const router = express.Router();
const controller = require("../controllers/internshipController");
const Internship = require("../models/Internship");

router.post("/", async (req, res) => {
    try {
      const internship = new Internship(req.body);
      await internship.save();
      res.status(201).json(internship);
    } catch (error) {
      res.status(500).json({ error: "Failed to save internship" });
    }
  });

router.get("/", async (req, res) => {
    try {
      const internship = await Internship.find();
      res.status(200).json(internship);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch internships" });
    }
  });
  

module.exports = router;
