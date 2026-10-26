module.exports = {
  coachPerks: [
    "Clases personalizadas",
    "Corrección técnica en tiempo real",
    "Progreso adaptado a tu nivel",
    "Enfoque en confianza y control",
  ],

  pricing: [
    {
      title: "1 persona",
      subtitle: "Clase personalizada",
      rates: [
        { duration: "2 horas", price: "₡24,000" },
        { duration: "1h 30min", price: "₡17,000" },
        { duration: "1 hora", price: "₡11,000" },
      ],
    },
    {
      title: "2 personas",
      subtitle: "Aprende acompañado",
      featured: true,
      badge: "Más popular",
      rates: [
        { duration: "2 horas", price: "₡19,000 c/u" },
        { duration: "1h 30min", price: "₡14,000 c/u" },
        { duration: "1 hora", price: "₡9,000 c/u" },
      ],
    },
    {
      title: "3 personas",
      subtitle: "Grupo dinámico",
      rates: [
        { duration: "2 horas", price: "₡16,000 c/u" },
        { duration: "1h 30min", price: "₡12,000 c/u" },
        { duration: "1 hora", price: "₡8,000 c/u" },
      ],
    },
    {
      title: "4 personas",
      subtitle: "Clase grupal",
      rates: [
        { duration: "2 horas", price: "₡14,000 c/u" },
        { duration: "1h 30min", price: "₡10,000 c/u" },
        { duration: "1 hora", price: "₡7,000 c/u" },
      ],
    },
  ],

  rental: [
    { label: "Casco", price: "₡2,000", icons: [{ src: "/images/icons/helmet.png", alt: "Casco" }] },
    { label: "Tabla", price: "₡4,000", icons: [{ src: "/images/icons/skateboard.png", alt: "Tabla" }] },
    {
      label: "Combo completo",
      price: "₡6,000",
      icons: [
        { src: "/images/icons/helmet.png", alt: "Casco" },
        { src: "/images/icons/skateboard.png", alt: "Tabla" },
      ],
    },
  ],

  conditions: [
    "Uso de casco obligatorio",
    "Supervisión durante la práctica",
    "Equipo higienizado",
    "Asistencia para principiantes",
  ],

  values: [
    {
      icon: "shield",
      title: "Seguridad ante todo",
      text: "Cada sesión está diseñada para minimizar riesgos y maximizar aprendizaje. Utilizamos equipo adecuado y supervisión constante para que progreses con confianza.",
    },
    {
      icon: "smile",
      title: "Aprender disfrutando",
      text: "El skate no es solo técnica, es actitud. Buscamos que cada clase sea una experiencia divertida que te motive a seguir avanzando.",
    },
    {
      icon: "users",
      title: "Comunidad real",
      text: "Fomentamos el respeto, el apoyo entre riders y una cultura positiva dentro del skatepark. Aquí todos crecen juntos.",
    },
    {
      icon: "trending-up",
      title: "Progreso constante",
      text: "Adaptamos cada clase a tu nivel para que avances de forma progresiva, desde lo básico hasta trucos más avanzados.",
    },
  ],

  classTypes: ["Clases personalizadas", "Clases grupales", "Sesión en Skatepark"],
};
