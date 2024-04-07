const express = require("express");
const router = express.Router();
const Contact = require("../schema/ContactDetails");
const mongoose = require("mongoose");

router.get("/", (req, res) => {
  res.send("Hi");
});

router.post("/addContact", async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    console.log(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/getcontact", async (req, res) => {
  try {
    const getContact = await Contact.find();
    res.status(200).json({ getContact });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deletecontactall", async (req, res) => {
  try {
    await Contact.deleteMany();
    console.log("All contacts deleted");
    res.status(200).json({ message: "All contacts deleted" });
  } catch (error) {
    console.error("Error deleting contacts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      console.log("Contact not found with ID:", id);
      return res.status(404).json({ message: "Contact not found" });
    }
    console.log("Contact deleted with ID:", id);
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body; // Change 'email' to 'mail'

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, mail: email }, // Change 'mail' to 'email'
      { new: true } // Return the updated document
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res
      .status(200)
      .json({ message: "Contact updated successfully", updatedContact });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;
