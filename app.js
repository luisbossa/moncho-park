require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

const app = express();

app.locals.process = {
  env: process.env,
};

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(expressLayouts);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/indexRoute"));

module.exports = app;