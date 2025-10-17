// src/services/productos.services.js
import { GetDB } from "../config/db.js";

const COLECCION_PRODUCTOS = "productos";

// 📦 Listar todos los productos
export async function listarProductos() {
  return await GetDB().collection(COLECCION_PRODUCTOS).find().toArray();
}

// 🔍 Buscar producto por nombre o id
export async function buscarProducto(filtro) {
  const { id, nombre } = filtro;

  if (!id && !nombre) {
    throw new Error("Debes proporcionar un nombre o un id para buscar.");
  }

  const criterio = id ? { id } : { nombre };
  const producto = await GetDB().collection(COLECCION_PRODUCTOS).findOne(criterio);

  if (!producto) throw new Error("Producto no encontrado.");
  return producto;
}

// 🛠️ Crear nuevo producto
export async function crearProducto(datos) {
  const { id, nombre, precio, cantidad_disponible, descripcion } = datos;

  if (!id || !nombre || !precio || cantidad_disponible == null || !descripcion) {
    throw new Error("Faltan campos obligatorios para crear el producto.");
  }

  const existe = await GetDB().collection(COLECCION_PRODUCTOS).findOne({ id });
  if (existe) throw new Error("Ya existe un producto con ese id.");

  const nuevoProducto = {
    id,
    nombre,
    precio: Number(precio),
    cantidad_disponible: Number(cantidad_disponible),
    descripcion,
    creadoEn: new Date(),
  };

  await GetDB().collection(COLECCION_PRODUCTOS).insertOne(nuevoProducto);
  return { message: "Producto creado exitosamente." };
}

// ✏️ Modificar producto (por id o nombre)
export async function modificarProducto(filtro, nuevosDatos) {
  const { id, nombre } = filtro;

  if (!id && !nombre) {
    throw new Error("Debes indicar el id o el nombre del producto a modificar.");
  }

  const criterio = id ? { id } : { nombre };

  const resultado = await GetDB().collection(COLECCION_PRODUCTOS).updateOne(
    criterio,
    { $set: nuevosDatos }
  );

  if (resultado.matchedCount === 0) throw new Error("Producto no encontrado.");
  return { message: "Producto modificado correctamente." };
}

// 🗑️ Eliminar producto (por id o nombre)
export async function eliminarProducto(filtro) {
  const { id, nombre } = filtro;

  if (!id && !nombre) {
    throw new Error("Debes indicar el id o el nombre del producto a eliminar.");
  }

  const criterio = id ? { id } : { nombre };

  const resultado = await GetDB().collection(COLECCION_PRODUCTOS).deleteOne(criterio);
  if (resultado.deletedCount === 0) throw new Error("Producto no encontrado.");

  return { message: "Producto eliminado correctamente." };
}
