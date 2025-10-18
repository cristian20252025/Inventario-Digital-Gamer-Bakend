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
    console.error("❌ Error en registrarUnUsuario:", error);
    res.status(400).json({ error: error.message });
  }
}

// 🔐 Iniciar sesión
export async function iniciarSesion(req, res) {
  try {
    console.log("🔐 Intento de login:", { 
      email: req.body.email,
      tieneContraseña: !!req.body.contraseña,
      body: req.body // Para ver qué campos llegan
    });

    const { email, contraseña } = req.body;

    // Validar que lleguen los datos
    if (!email || !contraseña) {
      console.error("❌ Faltan campos:", { email: !!email, contraseña: !!contraseña });
      return res.status(400).json({ error: "Email y contraseña son requeridos" });
    }

    // Validar credenciales usando el servicio
    console.log("🔍 Validando credenciales...");
    const usuario = await validarCredenciales(email, contraseña);
    console.log("✅ Usuario validado:", { id: usuario._id, email: usuario.email, tipo: usuario.tipo });

    // Guardar la sesión del usuario
    req.session.usuario = {
      id: usuario._id,
      usuario: usuario.usuario,
      tipo: usuario.tipo,
      email: usuario.email,
    };

    console.log("💾 Sesión guardada:", req.session.usuario);
    console.log("🍪 Session ID:", req.sessionID);

    // Forzar guardado de la sesión
    req.session.save((err) => {
      if (err) {
        console.error("❌ Error al guardar sesión:", err);
        return res.status(500).json({ error: "Error al guardar la sesión" });
      }

      console.log("✅ Sesión guardada exitosamente");
      res.status(200).json({ 
        mensaje: "✅ Sesión iniciada", 
        usuario: req.session.usuario 
      });
    });

  } catch (error) {
    console.error("❌ Error en iniciarSesion:", error);
    
    // Respuestas específicas según el error
    if (error.message === "Usuario no encontrado.") {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === "Contraseña incorrecta.") {
      return res.status(401).json({ error: error.message });
    }
    
    res.status(500).json({ error: "Error al iniciar sesión: " + error.message });
  }
}

// 🚪 Cerrar sesión
export async function cerrarSesion(req, res) {
  try {
    console.log("🚪 Cerrando sesión de:", req.session?.usuario?.email || "usuario desconocido");
    
    req.session.destroy((err) => {
      if (err) {
        console.error("❌ Error al cerrar sesión:", err);
        return res.status(500).json({ error: "No se pudo cerrar sesión" });
      }
      
      res.clearCookie("connect.sid");
      res.clearCookie("sessionId"); // Por si usamos nombre personalizado
      
      console.log("✅ Sesión cerrada correctamente");
      res.status(200).json({ mensaje: "✅ Sesión cerrada correctamente" });
    });
  } catch (error) {
    console.error("❌ Error en cerrarSesion:", error);
    res.status(500).json({ error: "Error al cerrar sesión" });
  }
}

// 🔑 Cambiar contraseña
export async function actualizarContraseña(req, res) {
  try {
    const { email, nuevaContraseña } = req.body;
    console.log("🔑 Cambio de contraseña para:", email);
    
    const resultado = await cambiarContraseña(email, nuevaContraseña);
    
    console.log("✅ Contraseña actualizada");
    res.status(200).json(resultado);
  } catch (error) {
    console.error("❌ Error en actualizarContraseña:", error);
    res.status(400).json({ error: error.message });
  }
}

// 🔍 Verificar sesión actual
export async function verificarSesionActual(req, res) {
  try {
    console.log("🔍 Verificando sesión...");
    console.log("Session ID:", req.sessionID);
    console.log("Usuario en sesión:", req.session?.usuario || "ninguno");
    
    // Revisa si existe una sesión activa
    if (!req.session || !req.session.usuario) {
      console.log("❌ No hay sesión activa");
      return res.status(401).json({ error: "No hay sesión activa" });
    }

    console.log("✅ Sesión válida encontrada");
    // Devuelve el usuario almacenado en la sesión
    res.status(200).json({ usuario: req.session.usuario });
  } catch (error) {
    console.error("❌ Error al verificar sesión:", error);
    res.status(500).json({ error: "Error al verificar sesión" });
  }
}