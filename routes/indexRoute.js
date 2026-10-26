const express = require("express");
const page = require("../controllers/indexController");

const router = express.Router();

router.get("/", page.home);
router.get("/shop", page.shop);
router.get("/lessons", page.lessons);
router.get("/events", page.events);
router.get("/contact", page.contact);
router.get("/donate", page.donate);
router.get("/history", page.history);
router.get("/privacy-policy", page.privacyPolicy);
router.get("/refund-policy", page.refundPolicy);
router.get("/shipping-policy", page.shippingPolicy);

module.exports = router;
