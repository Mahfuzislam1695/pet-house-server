const express = require('express')
const app = express()
const dotenv =require("dotenv");
const mongoose = require("mongoose");

require("./config/db");

const port = process.env.PORT || 5000;

app.use(express.json());

//we link the router files to make our rout easy
app.use(require('./routes/auth'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})