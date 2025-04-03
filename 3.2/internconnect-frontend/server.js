// const express = require("express");
// const path = require("path");
// const app = express();
// const PORT = 3000;

// app.use(express.static("public"));

// app.get("/about", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "about.html"));
// });

// app.get("/contact", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "contact.html"));
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;


// Middleware
app.use(express.static("public")); // For HTML, CSS, etc.
app.use(express.json()); // To handle JSON from client
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/internconnect", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB error:", err));

// Schema and Model
const Internship = mongoose.model("Internship", {
  title: String,
  company: String,
  skills: [String],
  location: String,
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// Add internship (POST)
app.post("/api/internships", async (req, res) => {
  const { title, company, skills, location } = req.body;
  try {
    const newInternship = new Internship({ title, company, skills, location });
    await newInternship.save();
    res.status(201).send("Internship saved successfully!");
  } catch (err) {
    console.error("Error saving internship:", err);
    res.status(500).send("Failed to save internship.");
  }
});

// Get all internships (GET)
app.get("/api/internships", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.json(internships);
  } catch (err) {
    res.status(500).send("Failed to fetch internships.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
