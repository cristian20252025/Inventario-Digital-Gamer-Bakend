import {
  registrarUsuario,
  validarCredenciales,
  cambiarContraseña,
} from "../services/usuarios.services.js";

// 🧍 Registrar usuario o empleado
export async function registrarUnUsuario(req, res) {
  try {
    const resultado = await registrarUsuario(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// 🔐 Iniciar sesión
export async function iniciarSesion(req, res) {
  try {
    const { email, contraseña } = req.body;
    const usuario = await validarCredenciales(email, contraseña);

    // Guardar info en cookie (simplificado)
    res.cookie("usuario", usuario, {
      httpOnly: true,
      secure: false, // poner en true si usas https
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      usuario,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

// 🚪 Cerrar sesión
export async function cerrarSesion(req, res) {
  try {
    res.clearCookie("usuario");
    res.status(200).json({ message: "Sesión cerrada correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al cerrar sesión." });
  }
}

// 🔑 Cambiar contraseña
export async function actualizarContraseña(req, res) {
  try {
    const { email, nuevaContraseña } = req.body;
    const resultado = await cambiarContraseña(email, nuevaContraseña);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
