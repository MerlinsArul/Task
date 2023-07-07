const express = require("express");
const cors = require("cors");
const db = require("./config/db.js");
const bodyParser = require("body-parser");
const Loginpage = require("./models/Loginpage.js");
const RegistrationPage = require("./models/Registrationpage.js");

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/login", async (req, res) => {
  const { emailId, password } = req.body;

  try {
    const user = await Loginpage.findOne({ where: { emailId, password } });
    if (user) {
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



db.authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Error:" + err));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
