const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  id: String, // Use String type for UUID
  name: String,
  email: String,
});

module.exports = contactSchema;
