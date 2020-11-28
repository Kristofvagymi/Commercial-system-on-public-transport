const express = require('express');
const bodyParser = require("body-parser");
const config = require("./04_config/db.config");
const mongoose = require("mongoose");
const cron = require("node-cron")

const userRouter = require('./01_api/user-routing.js');
const vehicleRouter = require('./01_api/vehicle-routing.js');
const adRouter = require('./01_api/ad-routing.js');
const adminAdRouter = require('./01_api/admin-ad-routing.js');
const auditSubscription = require('./05_scripts/audit-subscriptions')
const app = express();

mongoose
    .connect(config.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database is connected");
    })
    .catch(err => {
        console.log({ database_error: err });
    });

cron.schedule("0 0 2 * * *", function() {
    auditSubscription.auditSubscriptions();
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// router for user path
app.use('/user', userRouter);
app.use('/vehicle', vehicleRouter);
app.use('/advertisement', adRouter);
app.use('/admin-advertisement', adminAdRouter);

// set port, listen for requests
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});