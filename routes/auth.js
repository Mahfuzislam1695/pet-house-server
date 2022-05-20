const express = require('express');
const router = express.Router();

require('../config/db');
const config = require('../models/user');

router.get('/', (req, res) => {
  res.send('Hello World!')
})


router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(422).json({ error: "please filled properly" })
  }

  try {
    const userExist = User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
    }

    const user = new User({ name, email, password, confirmPassword });

    await user.save();

    res.status(201).json({ message: "successful" });

  } catch (error) {
    console.log(error);
  }

});

module.exports = router;