const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// Person
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // create a new person doc using the mongoose model
    const newPerson = new Person(data); //hover over person

    // Save the new person to data base
    const response = await newPerson.save();
    console.log("Response okay");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

// GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data get success");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

// Parameterised URL/endpoints
router.get("/:work", async (req, res) => {
  const workType = req.params.work; //Extract work type from URL parameter

  try {
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType }); //work: is the scheme defined in person.js

      console.log("Response fetched");
      res.status(200).json({ response });
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//   PUT method
router.put("/:personKaId", async (req, res) => {
  try {
    const personId = req.params.personKaId; //extract ID from URL
    const updatePersonData = req.body; //Updated data for person

    const response = await Person.findByIdAndUpdate(
      personId,
      updatePersonData,
      {
        new: true, //Return the updated data
        runValidators: true, //run mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:deleteId", async (req, res) => {
  try {
    const personId = req.params.deleteId; //extract ID from URL

    // assuming you have person model

    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data Deleted");
    res.status(200).json({ message: "Person deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
