// src/services/usuarios.services.js
import { GetDB } from "../config/db.js";
import bcrypt from "bcrypt";

const COLECCION_USUARIOS = "usuarios";

// Registrar usuario o empleado
export async function registrarUsuario(datos) {
  const { email, usuario, contraseña, tipo } = datos;

  if (!email || !usuario || !contraseña || !tipo) {
    throw new Error("Faltan campos obligatorios.");
  }

  const existe = await GetDB().collection(COLECCION_USUARIOS).findOne({ email });
  if (existe) throw new Error("El correo ya está registrado.");

  const hash = await bcrypt.hash(contraseña, 10);

  const nuevoUsuario = {
    email,
    usuario,
    contraseña: hash,
    tipo, // 'usuario' o 'empleado'
    creadoEn: new Date(),
  };

  await GetDB().collection(COLECCION_USUARIOS).insertOne(nuevoUsuario);
  return { message: "Registro exitoso." };
}

// Validar credenciales para login
export async function validarCredenciales(email, contraseña) {
  const usuario = await GetDB().collection(COLECCION_USUARIOS).findOne({ email });
  if (!usuario) throw new Error("Usuario no encontrado.");

  const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
  if (!coincide) throw new Error("Contraseña incorrecta.");

  // No retornamos la contraseña
  const { contraseña: _, ...userData } = usuario;
  return userData;
}

// Recuperar contraseña (simple)
export async function cambiarContraseña(email, nuevaContraseña) {
  const usuario = await GetDB().collection(COLECCION_USUARIOS).findOne({ email });
  if (!usuario) throw new Error("Usuario no encontrado.");

  const hash = await bcrypt.hash(nuevaContraseña, 10);

  await GetDB().collection(COLECCION_USUARIOS).updateOne(
    { email },
    { $set: { contraseña: hash } }
  );

  return { message: "Contraseña actualizada correctamente." };
}
