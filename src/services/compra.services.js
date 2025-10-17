// src/services/compras.services.js
import { GetDB } from "../config/db.js";

const COLECCION_PRODUCTOS = "productos";
const COLECCION_CARRITO = "carrito";
const COLECCION_HISTORIAL = "historial";

// 🛒 Agregar producto al carrito
export async function agregarAlCarrito(emailUsuario, idProducto, cantidad) {
  const db = GetDB();

  if (!emailUsuario || !idProducto || !cantidad) {
    throw new Error("Faltan datos para agregar al carrito.");
  }

  const producto = await db.collection(COLECCION_PRODUCTOS).findOne({ id: idProducto });
  if (!producto) throw new Error("Producto no encontrado.");
  if (producto.cantidad_disponible < cantidad) {
    throw new Error("Stock insuficiente para agregar este producto.");
  }

  // Calcular total
  const totalProducto = producto.precio * cantidad;

  // Descontar stock temporalmente
  await db.collection(COLECCION_PRODUCTOS).updateOne(
    { id: idProducto },
    { $inc: { cantidad_disponible: -cantidad } }
  );

  // Agregar al carrito
  await db.collection(COLECCION_CARRITO).insertOne({
    emailUsuario,
    idProducto,
    nombre: producto.nombre,
    cantidad,
    precio_unitario: producto.precio,
    total: totalProducto,
    agregadoEn: new Date(),
  });

  return { message: "Producto agregado al carrito correctamente." };
}

// 🧹 Borrar carrito (restaurar stock)
export async function borrarCarrito(emailUsuario) {
  const db = GetDB();

  const carrito = await db.collection(COLECCION_CARRITO).find({ emailUsuario }).toArray();

  if (carrito.length === 0) throw new Error("El carrito está vacío.");

  // Restaurar stock de cada producto
  for (const item of carrito) {
    await db.collection(COLECCION_PRODUCTOS).updateOne(
      { id: item.idProducto },
      { $inc: { cantidad_disponible: item.cantidad } }
    );
  }

  // Vaciar carrito
  await db.collection(COLECCION_CARRITO).deleteMany({ emailUsuario });

  return { message: "Carrito eliminado y stock restaurado correctamente." };
}

// 📜 Ver historial de compras
export async function verHistorial(emailUsuario) {
  const historial = await GetDB()
    .collection(COLECCION_HISTORIAL)
    .find({ emailUsuario })
    .sort({ fecha: -1 })
    .toArray();

  return historial;
}

// 💳 Realizar compra
export async function realizarCompra(emailUsuario) {
  const db = GetDB();

  const carrito = await db.collection(COLECCION_CARRITO).find({ emailUsuario }).toArray();

  if (carrito.length === 0) throw new Error("El carrito está vacío, no se puede comprar.");

  const totalCompra = carrito.reduce((acc, item) => acc + item.total, 0);

  const compra = {
    emailUsuario,
    productos: carrito.map(item => ({
      idProducto: item.idProducto,
      nombre: item.nombre,
      cantidad: item.cantidad,
      total: item.total,
    })),
    totalCompra,
    fecha: new Date(),
  };

  // Guardar en historial
  await db.collection(COLECCION_HISTORIAL).insertOne(compra);

  // Vaciar carrito
  await db.collection(COLECCION_CARRITO).deleteMany({ emailUsuario });

  return { message: "Compra realizada exitosamente.", totalCompra };
}
