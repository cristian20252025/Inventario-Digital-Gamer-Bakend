import { Router } from "express";
import { agregarProductoCarrito, eliminarCarrito, obtenerHistorial, confirmarCompra } from "../controllers/compras.controller.js";
import { agregarAlCarritoDTO } from "../dtos/compras.dto.js";
import { validationDTO } from "../middlewares/validationDto.js";
import { verificarSesion } from "../middlewares/verificarSecion.js";

const router = Router();

// Solo clientes autenticados pueden acceder
router.post("/carrito", verificarSesion, agregarAlCarritoDTO, validationDTO, agregarProductoCarrito);
router.delete("/carrito", verificarSesion, eliminarCarrito);
router.get("/historial", verificarSesion, obtenerHistorial);
router.post("/confirmar", verificarSesion, confirmarCompra);

export default router;
