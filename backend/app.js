const express = require('express');
const userRouter = require('./01_api/user-routing.js');
const bodyParser = require("body-parser");
const config = require("./04_config/db.config");
const User = require("./03_models/User");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(config.url, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// router for user path
app.use('/user', userRouter);


// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});