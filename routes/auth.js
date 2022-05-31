const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate")

require("../config/db");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: "please filled properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    } else if (password != confirmPassword) {
      return res.status(422).json({ error: "Password dont match" });
    } else {
      const user = new User({ name, email, password, confirmPassword });

      await user.save();

      res.status(201).json({ message: "successful" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "plz filled the data" });
    }
    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      console.log(token);

      res.cookie("access_token", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        return res.status(400).json({ error: "user error" });
      } else {
        res.json({ message: "successfully" });
      }
    } else {
      return res.status(400).json({ error: "user error" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/about",authenticate, (req, res) => {
  console.log("about");
  res.send(req.rootUser);
});

router.get("/logout", (req, res) => {
  return res
    .clearCookie("access_token", {path: "/"})
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
});


module.exports = router;
