const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signup_get = (req, res) => {
  res.render("signup");
};

exports.login_get = (req, res) => {
  res.render("login");
};

exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json({
      Message: "User Created Successfully",
      CreatedUser: user,
    });
  } catch (err) {
    if (err.code === 11000) {
      res.status(500).json({
        Message: "Email Already Exists and Registered",
      });
    } else {
      res.status(500).json({
        Message: "User Creation Unsuccessful",
        Error: err,
      });
    }
  }
};

exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  res.send("user login");
};
