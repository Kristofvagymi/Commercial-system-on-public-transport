const express = require("express");
const auth = require("../04_config/auth");
const userService = require("../02_services/user-service");

var router = express.Router();

router.post("/createUser", auth.loggedIn, auth.commercial_admin, (req, res) => {
    userService.createUser(req, res);
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

router.get("/users", auth.loggedIn, auth.commercial_admin, (req, res) => {
    userService.getUsers(req, res);
});

router.post("/uploadMoney", auth.loggedIn, (req, res) => {
    userService.uploadMoney(req, res);
});

module.exports = router;