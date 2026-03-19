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

router.get("/privacy-policy", (req, res) => {
  res.render("privacy-policy");
});

router.get("/refund-policy", (req, res) => {
  res.render("refund-policy");
});

router.get("/shipping-policy", (req, res) => {
  res.render("shipping-policy");
});

router.get("/donate", (req, res) => {
  res.render("donate");
});

router.get("/events", (req, res) => {
  res.render("events");
});

router.get("/shop", (req, res) => {
  res.render("shop");
});

module.exports = router;
