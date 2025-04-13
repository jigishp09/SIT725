const Internship = require("../models/Internship");

exports.createInternship = async (req, res) => {
  try {
    const { title, company, skills, location } = req.body;
    const internship = new Internship({ title, company, skills, location });
    await internship.save();
    res.status(201).send("Internship posted successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to post internship");
  }
};

exports.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch internships");
  }
};
