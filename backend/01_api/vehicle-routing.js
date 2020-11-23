const express = require("express");
const auth = require("../04_config/auth");
const vehicleService = require("../02_services/vehicle-service");

var router = express.Router();

router.get("/vehicles", auth.loggedIn, auth.transport_admin , (req, res) => {
    vehicleService.getVehicles(req, res);
 });

 router.get("/:registrationNumber", auth.loggedIn, auth.transport_admin , (req, res) => {
    vehicleService.getVehiclesByRegistrationNumber(req, res);
 });

module.exports = router;