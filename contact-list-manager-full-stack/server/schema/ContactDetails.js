const mongoose = require("mongoose");

const contactDetailsSchema = new mongoose.Schema({
  id: String,
  name: String,
  mail: String,
});

module.exports = mongoose.model("Contact", contactDetailsSchema);
