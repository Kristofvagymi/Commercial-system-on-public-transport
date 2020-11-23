const express = require("express");
const auth = require("../04_config/auth");
const userService = require("../02_services/user-service");

var router = express.Router();

router.post("/createUser", auth.loggedIn, auth.commercial_admin , (req, res) => {
   userService.createUser(req,res);
});

router.post("/login", (req, res) => {
   userService.loginUser(req, res);
});

router.post("/blockUserByName", auth.loggedIn, auth.commercial_admin, (req, res) => {
   userService.blockUserByName(req, res);
});

router.post("/enableUserByName", auth.loggedIn, auth.commercial_admin, (req, res) => {
   userService.enableUserByName(req, res);
});

router.post("/logout", auth.loggedIn, (req, res) => {
   res.json({ message: "Welcome to public commercial application." });
});

router.get("/users", auth.loggedIn, auth.commercial_admin , (req, res) => {
   userService.getUsers(req, res);
});

module.exports = router;