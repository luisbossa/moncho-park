require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

const site = require("./data/site");
const { notFound } = require("./controllers/indexController");

const app = express();
const isProd = process.env.NODE_ENV === "production";

app.disable("x-powered-by");

// Disponibles en todas las vistas
app.locals.site = site;
app.locals.formatCRC = (amount) => "₡ " + Number(amount).toLocaleString("en-US");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout");
if (isProd) app.set("view cache", true);

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: isProd ? "7d" : 0,
  })
);

app.use(expressLayouts);

// Marca el link activo del menú
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use("/", require("./routes/indexRoute"));
app.use(notFound);

module.exports = app;
