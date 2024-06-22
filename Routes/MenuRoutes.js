const express = require("express");
const router = express.Router();
const MenuItem = require("../models/Menu");

// Menu*****************************
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    // create a new person doc using the mongoose model
    const newMenu = new MenuItem(data); //hover over person

    // Save the new person to data base
    const response = await newMenu.save();
    console.log("Response okay");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

// GET method to get the Menuitems
router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Menu items displayed");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

// Parameterised URL/endpoints
router.get("/:taste", async (req, res) => {
  const tasteType = req.params.taste; //Extract work type from URL parameter

  try {
    if (tasteType == "sweet" || tasteType == "spicy") {
      const response = await MenuItem.find({ taste: tasteType }); //taste: is the scheme defined in Menu.js

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
module.exports = router;
