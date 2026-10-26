module.exports = {
  name: "Monchopark",

  mainNav: [
    { label: "Inicio", href: "/" },
    { label: "Acerca de", href: "/#about" },
    { label: "Parque", href: "/#park" },
    { label: "Revista", href: "/#magazine" },
    { label: "Tienda", href: "/shop" },
  ],

  mobileExtraNav: [
    { label: "Donar", href: "/donate" },
    { label: "Contactar", href: "/contact" },
  ],

  contact: {
    email: "poliskate@gmail.com",
    address: "Calle 1, Barrio San Juan, San Ramón, Alajuela, Costa Rica",
    mapsUrl:
      "https://www.google.com/maps/place/San+Ramon+Skatepark/@10.0973579,-84.4738183,17.5z/data=!4m15!1m8!3m7!1s0x8fa044f3af84f003:0x5a8a5d7ab4db941f!2sC.+Polideportivo,+Provincia+de+Alajuela,+San+Ram%C3%B3n!3b1!8m2!3d10.099071!4d-84.4732782!16s%2Fg%2F11h54_06tk!3m5!1s0x8fa045005a61177b:0x528c498dc32a947!8m2!3d10.0982839!4d-84.4732607!16s%2Fg%2F11yftbhd46?entry=ttu&g_ep=EgoyMDI2MDMxNy4wIKXMDSoASAFQAw%3D%3D",
  },

  footerNav: [
    {
      title: "Explorar",
      links: [
        { label: "Inicio", href: "/" },
        { label: "Historia", href: "/history" },
        { label: "Eventos", href: "/events" },
        { label: "Contáctanos", href: "/contact" },
      ],
    },
    {
      title: "Políticas",
      links: [
        { label: "Política de privacidad", href: "/privacy-policy" },
        { label: "Política de reembolso", href: "/refund-policy" },
        { label: "Política de envío", href: "/shipping-policy" },
      ],
    },
    {
      title: "Hacer",
      links: [
        { label: "Clases de skate", href: "/lessons" },
        { label: "Donar", href: "/donate" },
      ],
    },
  ],

  social: [
    { label: "Síguenos en Facebook", icon: "/images/icons/facebook.svg", alt: "Facebook icon", href: "#" },
    { label: "Síguenos en Instagram", icon: "/images/icons/instagram.svg", alt: "Instagram icon", href: "#" },
  ],
};
