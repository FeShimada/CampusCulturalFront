require("dotenv").config();

const db = require("./db");

const PORT = process.env.PORT;

const express = require("express");

const app = express();

app.listen(PORT);

console.log("App running on port " + PORT);