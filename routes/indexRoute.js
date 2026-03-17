const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/contact", (req, res) => {
  res.render("contact");
});

router.get("/history", (req, res) => {
  res.render("history");
});

router.get("/lessons", (req, res) => {
  res.render("lessons");
});

module.exports = router;
