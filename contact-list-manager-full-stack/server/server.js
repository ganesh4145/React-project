const express = require("express");
const cors = require("cors");
const connectDB = require("./MongoDB/Connection");
const logEvent = require("./Log/logEvent");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.use((req, res, next) => {
  logEvent(
    `${req.method}\t${req.method}\t${req.headers.origin}\t${req.url}`,
    "reqLog.txt"
  );
  next();
});

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
app.use("/", require("./MongoDB/Operation"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
