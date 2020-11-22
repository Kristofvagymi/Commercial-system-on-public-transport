const express = require("express");

var router = express.Router();

// simple route
router.get("/", (req, res) => {
    res.json({ message: "Welcome to public commercial application." });
});

module.exports = router;