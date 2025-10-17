import {
  listarProductos,
  buscarProducto,
  crearProducto,
  modificarProducto,
  eliminarProducto
} from "../services/productos.service.js";

// 📦 Listar todos los productos
export async function obtenerTodosLosProductos(req, res) {
  try {
    const productos = await listarProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al listar los productos." });
  }
}

// 🔍 Buscar producto por id o nombre
export async function obtenerProducto(req, res) {
  try {
    const { id, nombre } = req.query; // se puede buscar por query param
    const producto = await buscarProducto({ id, nombre });

    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado." });

    res.status(200).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// 🛠️ Crear nuevo producto
export async function crearUnProducto(req, res) {
  try {
    const resultado = await crearProducto(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// ✏️ Modificar producto
export async function actualizarUnProducto(req, res) {
  try {
    const { id, nombre } = req.query; // se usa query param para identificar
    const resultado = await modificarProducto({ id, nombre }, req.body);
    res.status(202).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}

// 🗑️ Eliminar producto
export async function eliminarUnProducto(req, res) {
  try {
    const { id, nombre } = req.query;
    const resultado = await eliminarProducto({ id, nombre });
    res.status(200).json(resultado);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
