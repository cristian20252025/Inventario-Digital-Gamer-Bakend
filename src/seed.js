import { ConnectDB, GetDB } from "./config/db.js";
import bcrypt from "bcrypt";

async function seed() {
  await ConnectDB();
  const db = GetDB();

  // 🔒 Hasheamos contraseñas para los usuarios
  const hashUsuario = await bcrypt.hash("usuario123", 10);
  const hashEmpleado = await bcrypt.hash("empleado123", 10);

  // 👤 Usuarios de ejemplo
  const usuarios = [
    {
      email: "cliente@example.com",
      usuario: "ClienteDemo",
      contraseña: hashUsuario,
      tipo: "usuario",
      creadoEn: new Date(),
    },
    {
      email: "empleado@example.com",
      usuario: "EmpleadoAdmin",
      contraseña: hashEmpleado,
      tipo: "empleado",
      creadoEn: new Date(),
    },
  ];

  // 🎮 Productos de ejemplo
  const productos = [
    {
      id: "P001",
      nombre: "The Legend of Zelda: Breath of the Wild",
      precio: 59.99,
      cantidad_disponible: 10,
      descripcion: "Juego de aventura y exploración en mundo abierto para Nintendo Switch.",
      creadoEn: new Date(),
    },
    {
      id: "P002",
      nombre: "Elden Ring",
      precio: 69.99,
      cantidad_disponible: 8,
      descripcion: "RPG de acción desarrollado por FromSoftware con diseño de mundo de George R. R. Martin.",
      creadoEn: new Date(),
    },
    {
      id: "P003",
      nombre: "God of War: Ragnarök",
      precio: 69.99,
      cantidad_disponible: 5,
      descripcion: "Aventura épica de Kratos y Atreus enfrentando el fin de los tiempos nórdico.",
      creadoEn: new Date(),
    },
    {
      id: "P004",
      nombre: "Minecraft",
      precio: 29.99,
      cantidad_disponible: 20,
      descripcion: "Juego de construcción y supervivencia con mundos generados proceduralmente.",
      creadoEn: new Date(),
    },
    {
      id: "P005",
      nombre: "Cyberpunk 2077",
      precio: 49.99,
      cantidad_disponible: 12,
      descripcion: "RPG futurista ambientado en Night City con múltiples caminos narrativos.",
      creadoEn: new Date(),
    },
  ];

  // 🧹 Limpiar colecciones previas
  await db.collection("usuarios").deleteMany({});
  await db.collection("productos").deleteMany({});
  await db.collection("carrito").deleteMany({});
  await db.collection("historial").deleteMany({});

  // 💾 Insertar nuevos datos
  await db.collection("usuarios").insertMany(usuarios);
  await db.collection("productos").insertMany(productos);

  console.log("✅ Base de datos poblada con éxito.");
  process.exit();
}

seed();
