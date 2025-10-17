import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config.js";
import { ConnectDB } from "./config/db.js";

// Routers
import routerUsuarios from "./routes/usuario.router.js";
import routerProductos from "./routes/producto.router.js";
import routerCompras from "./routes/compra.router.js";

// Inicialización
const app = express();

// Middlewares globales
app.use(express.json());
app.use(cookieParser());

// ⚙️ Configuración segura de CORS
app.use(
  cors({
    origin: "http://localhost:5173", // tu frontend local
    credentials: true, // permite enviar cookies
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rutas
app.use("/usuarios", routerUsuarios);
app.use("/productos", routerProductos);
app.use("/compras", routerCompras);

// Endpoint de verificación
app.get("/health", (req, res) => {
  res.status(200).json({ message: "✅ Backend activo y saludable!" });
});

// 🔌 Conexión y arranque
ConnectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Servidor corriendo en 👉 http://${process.env.HOST_NAME}:${process.env.PORT}`
    );
  });
});
