const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/internconnect", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("MongoDB error:", err));

app.use("/api/auth", require("./routes/auth"));


const internshipController = require("./controllers/internshipController")(io);
const internshipRoutes = require("./routes/internships");
app.use("/api/internships", internshipController, internshipRoutes);


app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

