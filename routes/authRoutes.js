const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/authController");

router.get("/signup", AuthController.signup_get);

router.post("/signup", AuthController.signup_post);

router.get("/login", AuthController.login_get);

router.post("/login", AuthController.login_post);

module.exports = router;
