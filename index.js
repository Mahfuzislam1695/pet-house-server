const cookieParser = require('cookie-parser')
const express = require("express");
const cors = require("cors");
require('dotenv').config()
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const app = express();
app.use(cookieParser())

const port = process.env.PORT || 5000;

require("./config/db")

app.use(cors());
const User = require("./models/user");
app.use(express.json());
app.use(require("./routes/auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
