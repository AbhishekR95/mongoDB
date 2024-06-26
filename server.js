const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const passport = require("./auth");

require("dotenv").config();

app.use(bodyParser.json()); //stored in req.body
const PORT = process.env.PORT || 3000;

// GET authenticate
const localAuthMiddleware = passport.authenticate("local", { session: false });
app.get("/", function (req, res) {
  res.send("Hello World");
});

// Middleware
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
  );
  next();
};
app.use(logRequest); //apply middleware to all all get/post

app.use(passport.initialize());

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
