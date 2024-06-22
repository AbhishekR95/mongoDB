const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(bodyParser.json()); //stored in req.body
const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

// Import Person from PersonRoutes
const personRoutes = require("./Routes/PersonRoutes");
const menunRoutes = require("./Routes/MenuRoutes");

// use the routers
app.use("/person", personRoutes);
app.use("/menu", menunRoutes);

// Listen on the port
app.listen(PORT, () => {
  console.log("Server on 3000");
});
