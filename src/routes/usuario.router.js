import { Router } from "express";
import {
  registrarUnUsuario,
  iniciarSesion,
  cerrarSesion,
  actualizarContraseña
} from "../controllers/usuario.controllers.js";
import {
  registrarUsuarioDTO,
  loginUsuarioDTO,
  cambiarContraseñaDTO
} from "../dto/usuario.dto.js";
import { validationDTO } from "../middlewares/validationDto.js";

const router = Router();

// 🧍 Registrar usuario o empleado
router.post("/registrar", registrarUsuarioDTO, validationDTO, registrarUnUsuario);

// 🔐 Iniciar sesión
router.post("/login", loginUsuarioDTO, validationDTO, iniciarSesion);

// 🚪 Cerrar sesión
router.post("/logout", cerrarSesion);

// 🔑 Cambiar contraseña
router.patch("/cambiar-contraseña", cambiarContraseñaDTO, validationDTO, actualizarContraseña);

export default router;
