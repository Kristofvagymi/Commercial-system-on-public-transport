const express = require("express");
const auth = require("../04_config/auth");
const userService = require("../02_services/user-service");

var router = express.Router();

router.post("/createUser", auth.loggedIn, auth.commercial_admin , (req, res) => {
   userService.createUser(req,res);
});

router.post("/login", (req, res) => {
   res.json({ message: "Welcome to public commercial application." });
});

router.post("/blockUserByName", auth.loggedIn, auth.commercial_admin, (req, res) => {
   res.json({ message: "Welcome to public commercial application." });
});

router.post("/enableUserByName", auth.loggedIn, auth.commercial_admin, (req, res) => {
   res.json({ message: "Welcome to public commercial application." });
});

router.post("/logout", auth.loggedIn, (req, res) => {
   res.json({ message: "Welcome to public commercial application." });
});

router.get("/users", auth.loggedIn, auth.commercial_admin , (req, res) => {
   res.json({ message: "Welcome to public commercial application." });
});

module.exports = router;