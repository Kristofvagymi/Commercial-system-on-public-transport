const express = require("express");
const auth = require("../04_config/auth");
const adService = require("../02_services/ad-service");
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

router.post("/", upload.single('file'), (req, res) => {
    adService.createAd(req,res);
});

router.delete("/:id", (req, res) => {
    adService.deleteAd(req,res);
});

router.get("/advertisements", auth.loggedIn, (req, res) => {
    adService.getAdvertisements(req,res);
});

router.post("/getCustomAdvertisement", auth.loggedIn, auth.service, (req, res) => {
    adService.getCustomAdvertisement(req,res);
});

module.exports = router;