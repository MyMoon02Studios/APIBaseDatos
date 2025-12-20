const express = require("express");
const helmet = require("helmet"); // Seguridad: Cabeceras HTTP
const cors = require("cors"); // Para permitir peticiones de tu frontend
const mainRouter = require("./routes"); // Importa nuestro router principal

// Inicialización de la aplicación Express
const app = express();

// A. Middlewares de Producción
// El orden importa: van antes de las rutas.

// 1. Seguridad (Helmet)
app.use(helmet());

// 2. CORS (Acceso)
// Permite que cualquier dominio acceda (en producción, deberías limitar esto)
const allowedOrigins = [
  "https://apibasedatos.onrender.com",
  "http://localhost:3001",
];

app.use(
  cors({
    origin: allowedOrigins, // En producción, reemplaza '*' por tu URL de frontend (ej. 'https://mi-frontend.com')
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// 3. Procesamiento de JSON
// Esto permite que Express lea los datos JSON que le envías
app.use(express.json());

// B. Rutas de la API
// Cualquier ruta que empiece con '/api' será manejada por nuestro router
app.use("/api", mainRouter);

// C. Manejo de Rutas No Encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({
    message: "Error 404: Ruta no encontrada",
    path: req.path,
  });
});

// D. Manejo de Errores Global (500)
// Este es el último middleware. Atrapa cualquier error no capturado.
app.use((err, req, res, next) => {
  console.error(err.stack); // Muestra el error en la consola del servidor
  res.status(err.status || 500).json({
    message: err.message || "Error interno del servidor",
    error: process.env.NODE_ENV === "production" ? {} : err.stack, // Ocultamos el stack en producción
  });
});

module.exports = app;
