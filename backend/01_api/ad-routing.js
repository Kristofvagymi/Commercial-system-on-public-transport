const express = require("express");
const auth = require("../04_config/auth");
const adService = require("../02_services/ad-service");

var router = express.Router();

router.post("/", auth.loggedIn, (req, res) => {
    adService.createAd(req, res)
});

router.delete("/:id", auth.loggedIn, auth.commercial_admin, (req, res) => {
    adService.deleteAd(req, res);
});

router.get("/advertisements", auth.loggedIn, auth.commercial_admin, (req, res) => {
    adService.getAdvertisements(req, res);
});

router.post("/getCustomAdvertisement", auth.loggedIn, auth.service, (req, res) => {
    adService.getCustomAdvertisement(req, res);
});

router.post("/getAdvertisementContent", auth.loggedIn, (req, res) => {
    adService.getAdvertisementContent(req, res);
});

router.get("/:id/preview", (req, res) => {
    adService.getAdvertisementPreview(req, res);
});

router.get("/getAdvertisementsByUser", auth.loggedIn, (req, res) => {
    adService.getAdvertisementsByUser(req, res);
});

module.exports = router;