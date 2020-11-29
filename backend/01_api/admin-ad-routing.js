const express = require("express");
const auth = require("../04_config/auth");
const adminAdService = require("../02_services/admin-ad-service");
const multer = require('multer');
const fs = require('fs');

var router = express.Router();

router.post("/", auth.loggedIn, auth.transport_admin, (req, res) => {
    adminAdService.createAdminAd(req, res);
});

router.delete("/deleteAdminAdvertisement/:id", auth.loggedIn, auth.transport_admin, (req, res) => {
    adminAdService.deleteAdminAd(req, res);
});

router.get("/", auth.loggedIn, auth.transport_admin, (req, res) => {
    adminAdService.getAdminAds(req, res);
});

router.get("/:id/preview", (req, res) => {
    adminAdService.getAdminAdvertisementPreview(req, res);
});

module.exports = router;