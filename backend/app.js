const express = require('express');
const userRouter = require('./01_api/user-routing.js');
const bodyParser = require("body-parser");
const config = require("./04_config/db.config");
const User = require("./03_models/User");

const app = express();

mongoose.set("useCreateIndex", true);
mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
    const transport_admin = new User({username: 'transport_admin', password: 'pw', role: 'transport_admin', money: 0, blockable: false});
    const commercial_admin = new User({username: 'commercial_admin', password: 'pw', role: 'commercial_admin', money: 0, blockable: false});
    const advertiser = new User({username: 'advertiser', password: 'pw', role: 'advertiser', money: 0, blockable: true});

    console.log('default users:\n');
    console.log(transport_admin);
    console.log(commercial_admin);
    console.log(advertiser);

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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});