import {
agregarAlCarrito,
borrarCarrito,
verHistorial,
realizarCompra
} from "../services/compras.services.js";

// 🛒 Agregar producto al carrito
export async function agregarProductoCarrito(req, res) {
try {
const emailUsuario = req.cookies.usuario?.email; // ✅ Tomar email desde cookie
const { idProducto, cantidad } = req.body;

if (!emailUsuario) {
  return res.status(401).json({ error: "Debe iniciar sesión para agregar productos al carrito." });
}

const resultado = await agregarAlCarrito(emailUsuario, idProducto, cantidad);
res.status(200).json(resultado);

} catch (error) {
console.error("Error al agregar al carrito:", error);
res.status(500).json({ error: "Error del servidor al agregar al carrito." });
}
}

// 🧹 Borrar carrito
export async function eliminarCarrito(req, res) {
try {
const emailUsuario = req.cookies.usuario?.email; // ✅ Desde cookie

if (!emailUsuario) {
  return res.status(401).json({ error: "Debe iniciar sesión para eliminar el carrito." });
}

const resultado = await borrarCarrito(emailUsuario);
res.status(200).json(resultado);

} catch (error) {
console.error("Error al borrar el carrito:", error);
res.status(500).json({ error: "Error del servidor al eliminar el carrito." });
}
}

// 📜 Ver historial de compras
export async function obtenerHistorial(req, res) {
try {
const emailUsuario = req.cookies.usuario?.email; // ✅ Desde cookie

if (!emailUsuario) {
  return res.status(401).json({ error: "Debe iniciar sesión para ver su historial de compras." });
}

const historial = await verHistorial(emailUsuario);
res.status(200).json(historial);

} catch (error) {
console.error("Error al obtener el historial:", error);
res.status(500).json({ error: "Error del servidor al obtener el historial." });
}
}

// 💳 Realizar compra
export async function confirmarCompra(req, res) {
try {
const emailUsuario = req.cookies.usuario?.email; // ✅ Desde cookie

if (!emailUsuario) {
  return res.status(401).json({ error: "Debe iniciar sesión para realizar la compra." });
}

const resultado = await realizarCompra(emailUsuario);
res.status(200).json(resultado);

} catch (error) {
console.error("Error al realizar la compra:", error);
res.status(500).json({ error: "Error del servidor al procesar la compra." });
}
}
