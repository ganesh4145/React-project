const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvent = async (message, fileName) => {
  const datetime = format(new Date(), "ddMMyyyy\tHH:MM:ss");
  const logItem = `${datetime}\t${uuid()}\t${message}\n`;
  try {
    const logDir = path.join(__dirname, "LogFiles");
    if (!fs.existsSync(logDir)) {
      await fsPromises.mkdir(logDir);
    }
    await fsPromises.appendFile(path.join(logDir, fileName), logItem);
  } catch (err) {
    console.error("Error while logging event:", err);
  }
};

module.exports = logEvent;
