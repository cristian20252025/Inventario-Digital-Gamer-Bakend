// ===================================
// SERVER.JS - Backend con sesiones corregidas
// ===================================
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import "dotenv/config.js";
import { ConnectDB } from "./config/db.js";

// Routers
import routerUsuarios from "./routes/usuario.router.js";
import routerProductos from "./routes/producto.router.js";
import routerCompras from "./routes/compra.router.js";

const app = express();

// ✅ ORDEN IMPORTANTE: cookieParser ANTES de express-session
app.use(cookieParser());
app.use(express.json());

// ✅ CORS - Configuración correcta para sesiones
app.use(
  cors({
    origin: "http://localhost:5500", // Tu Live Server
    credentials: true, // ✅ CRÍTICO para cookies
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Sesiones con configuración CORREGIDA
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecreto123456",
    name: "sessionId", // Nombre de la cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // ✅ Cambiado a true para seguridad
      secure: false, // false porque usamos HTTP (no HTTPS)
      sameSite: "lax", // ✅ Importante para CORS
      maxAge: 1000 * 60 * 60 * 24, // 24 horas
      path: "/",
    },
  })
);

// ✅ Debug middleware MEJORADO
app.use((req, res, next) => {
  console.log("\n" + "=".repeat(50));
  console.log("📍", req.method, req.path);
  console.log("🍪 Cookies recibidas:", req.cookies);
  console.log("🆔 SessionID:", req.sessionID);
  console.log("👤 Usuario en sesión:", req.session?.usuario || "ninguno");
  console.log("🌐 Origin:", req.headers.origin);
  console.log("=".repeat(50) + "\n");
  next();
});

// ✅ Rutas
app.use("/usuarios", routerUsuarios);
app.use("/productos", routerProductos);
app.use("/compras", routerCompras);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ 
    message: "✅ Backend OK",
    session: !!req.session,
    sessionID: req.sessionID
  });
});

// ✅ Manejador de errores
app.use((err, req, res, next) => {
  console.error("❌ Error en el servidor:", err);
  res.status(500).json({ 
    error: "Error interno del servidor",
    message: err.message 
  });
});

// ✅ Iniciar servidor
ConnectDB().then(() => {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, "localhost", () => {
    console.log("\n" + "🚀".repeat(25));
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log("🚀".repeat(25) + "\n");
  });
}).catch(err => {
  console.error("❌ Error al conectar a la base de datos:", err);
  process.exit(1);
});