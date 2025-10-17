import { Router } from "express";
import {
  obtenerTodosLosProductos,
  obtenerProducto,
  crearUnProducto,
  actualizarUnProducto,
  eliminarUnProducto
} from "../controllers/producto.controllers.js";
import {
  crearProductoDTO,
  modificarProductoDTO,
  buscarEliminarProductoDTO
} from "../dto/producto.dto.js";
import { validationDTO } from "../middlewares/validationDto.js";

const router = Router();

// 📦 Listar todos los productos
router.get("/", obtenerTodosLosProductos);

// 🔍 Buscar producto por id o nombre (query params)
router.get("/buscar", buscarEliminarProductoDTO, validationDTO, obtenerProducto);

// 🛠️ Crear nuevo producto
router.post("/", crearProductoDTO, validationDTO, crearUnProducto);

// ✏️ Modificar producto (por id o nombre en query)
router.patch("/", buscarEliminarProductoDTO, validationDTO, modificarProductoDTO, validationDTO, actualizarUnProducto);

// 🗑️ Eliminar producto (por id o nombre en query)
router.delete("/", buscarEliminarProductoDTO, validationDTO, eliminarUnProducto);

export default router;
