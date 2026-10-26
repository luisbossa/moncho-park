# Moncho Park

**Moncho Park** is a modern web platform built for the **San Ramón Skatepark community**, designed to bring the park experience into a clean, interactive, and scalable digital environment.

---

## Overview

Moncho Park is a digital extension of the skatepark culture.

It allows users to:

- Explore the skatepark
- Stay updated with events and activities
- Contact the park team
- Navigate through a modern responsive interface

The platform focuses on **performance, minimalism, and user experience**, aligned with urban/skate aesthetics.

---

## Tech Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- Passport.js
- JWT Authentication
- Express Sessions
- bcryptjs
- Nodemailer

### Frontend

- EJS (Server-side rendering)
- CSS (Responsive design)
- Vanilla JavaScript

## Features

- User authentication system (JWT + sessions)
- Contact form with email integration
- Fully responsive design
- Fast server-side rendering with EJS
- Modular and scalable architecture

---

## Installation

Clone the repository:

```bash
git clone https://github.com/luisbossa/moncho-park 
```

---

## Estructura del proyecto

```
app.js                  # Configuración de Express (vistas, estáticos, rutas, 404)
server.js               # Arranque local
api/index.js            # Entrada para Vercel
routes/indexRoute.js    # Rutas → controlador
controllers/            # Define vista, título, datos y scripts de cada página
data/                   # Contenido del sitio (productos, eventos, clases, navegación…)
views/
  layouts/layout.ejs    # Layout base (head, footer, scripts por página)
  partials/             # header, footer, heroes, botones e íconos reutilizables
  *.ejs                 # Páginas
public/
  css/                  # Estilos
  js/                   # Interacción del cliente (no genera HTML; lee data-* renderizados por EJS)
  js/vendor/            # Librerías de terceros (Elementor, Image Map Pro)
```

Para agregar o modificar productos, eventos, tarifas o enlaces, edita el archivo correspondiente en `data/`.
