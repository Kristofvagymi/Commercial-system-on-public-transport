const express = require("express");
const auth = require("../04_config/auth");
const adService = require("../02_services/ad-service");

var router = express.Router();

router.post("/", auth.loggedIn, (req, res) => {
    adService.createAd(req,res);
});

router.delete("/:id", auth.loggedIn, (req, res) => {
    adService.deleteAd(req,res);
});

router.get("/advertisements", auth.loggedIn, (req, res) => {
    adService.getAdvertisements(req,res);
});

router.post("/getCustomAdvertisement", auth.loggedIn, auth.service, (req, res) => {
    adService.getCustomAdvertisement(req,res);
});

module.exports = router;