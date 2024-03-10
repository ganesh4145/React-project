const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./schema/ContactDetails");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

main().catch((err) => console.error(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ContactList", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hi");
});

app.post("/addContact", async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    console.log(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getcontact", async (req, res) => {
  try {
    const getContact = await Contact.find();
    res.status(200).json({ getContact });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
