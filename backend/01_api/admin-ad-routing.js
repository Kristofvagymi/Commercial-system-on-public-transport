const express = require("express");
const auth = require("../04_config/auth");
const adminAdService = require("../02_services/admin-ad-service");
const multer = require('multer');
const fs = require('fs');

var router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        req.user = {}
        req.user.username = 'TEST'
        const path = `./99_uploads/${req.user.username}/`
        req.body.path = path
        req.body.fileName = file.originalname
        fs.mkdirSync(path, { recursive: true })
        cb(null, path)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/", auth.loggedIn, auth.transport_admin, upload.single('file'), (req, res) => {
    adminAdService.createAdminAd(req,res);
});

router.delete("/deleteAdminAdvertisement/:id", auth.loggedIn, auth.transport_admin, (req, res) => {
    adminAdService.deleteAdminAd(req,res);
});

router.get("/", auth.loggedIn, auth.transport_admin, (req, res) => {
    adminAdService.getAdminAds(req,res);
});

module.exports = router;