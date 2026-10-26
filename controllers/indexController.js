const home = require("../data/home");
const shop = require("../data/shop");
const lessons = require("../data/lessons");
const events = require("../data/events");
const contact = require("../data/contact");

const LUCIDE_CDN = "https://unpkg.com/lucide@0.460.0/dist/umd/lucide.min.js";

// Cada página declara su vista, título y los scripts que necesita,
// así el layout sólo carga lo que se usa en esa página.
// Todos se cargan con defer, por lo que se ejecutan en el orden listado.
const pages = {
  home: {
    view: "index",
    title: "Inicio",
    scripts: [
      "https://code.jquery.com/jquery-3.6.0.min.js",
      "/js/vendor/frontend.min.js",
      "/js/vendor/image-map-pro.js",
      "/js/park-map.js",
      "/js/park.js",
      "/js/vendor/move.js",
      "/js/vendor/webpack.js",
      "/js/videos.js",
      "/js/slider.js",
      "/js/discount.js",
    ],
    data: home,
  },
  shop: { view: "shop", title: "Tienda", scripts: ["/js/shop.js"], data: shop },
  lessons: { view: "lessons", title: "Clases de Skate", scripts: [LUCIDE_CDN, "/js/lessons.js"], data: lessons },
  events: { view: "events", title: "Eventos", data: { events } },
  contact: { view: "contact", title: "Contáctanos", scripts: ["/js/contact.js"], data: contact },
  donate: { view: "donate", title: "Donar", scripts: ["/js/donate.js"], data: contact },
  history: { view: "history", title: "Historia" },
  privacyPolicy: { view: "privacy-policy", title: "Política de Privacidad" },
  refundPolicy: { view: "refund-policy", title: "Política de Reembolso" },
  shippingPolicy: { view: "shipping-policy", title: "Política de Envío" },
};

const render = ({ view, title, scripts = [], data = {} }) =>
  (req, res) => res.render(view, { title, scripts, ...data });

module.exports = Object.fromEntries(
  Object.entries(pages).map(([name, page]) => [name, render(page)])
);

module.exports.notFound = (req, res) =>
  res.status(404).render("404", { title: "Página no encontrada", scripts: [] });
