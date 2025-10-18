// src/middlewares/verificarSesion.js

/**
 * 🔐 Middleware para verificar que el usuario tenga sesión activa
 * y sea un usuario/cliente (no empleado)
 */
export function verificarSesion(req, res, next) {
  console.log('🔐 [verificarSesion] Verificando sesión...');
  console.log('📦 Session ID:', req.sessionID);
  console.log('👤 Usuario en sesión:', req.session?.usuario);

  // ✅ CAMBIO CRÍTICO: Usar req.session en lugar de req.cookies
  const usuario = req.session?.usuario;

  // Verificar que existe un usuario en la sesión
  if (!usuario) {
    console.error('❌ No hay usuario en la sesión');
    return res.status(401).json({ 
      error: "Debe iniciar sesión para continuar." 
    });
  }

  console.log('📋 Tipo de usuario:', usuario.tipo);

  // ✅ SOLUCIÓN: Aceptar "usuario" (tu seed usa este tipo)
  // Rechazar solo si es "empleado"
  if (usuario.tipo === "empleado") {
    console.error('❌ Usuario es empleado, no tiene acceso a compras');
    return res.status(403).json({ 
      error: "Esta sección es solo para clientes." 
    });
  }

  // Verificar que el tipo sea "usuario" o "cliente"
  if (usuario.tipo !== "usuario" && usuario.tipo !== "cliente") {
    console.error('❌ Tipo de usuario no válido:', usuario.tipo);
    return res.status(403).json({ 
      error: "Tipo de usuario no autorizado." 
    });
  }

  console.log('✅ Sesión válida. Usuario autorizado:', {
    email: usuario.email,
    tipo: usuario.tipo,
    usuario: usuario.usuario
  });

  // Adjuntar usuario al request para uso posterior
  req.usuario = usuario;

  // Continuar con la siguiente función
  next();
}

/**
 * 🔐 Middleware para verificar que el usuario sea empleado
 */
export function verificarEmpleado(req, res, next) {
  console.log('🔐 [verificarEmpleado] Verificando sesión de empleado...');
  
  const usuario = req.session?.usuario;

  if (!usuario) {
    console.error('❌ No hay usuario en la sesión');
    return res.status(401).json({ 
      error: "Debe iniciar sesión para continuar." 
    });
  }

  if (usuario.tipo !== "empleado") {
    console.error('❌ Usuario no es empleado:', usuario.tipo);
    return res.status(403).json({ 
      error: "Esta sección es solo para empleados." 
    });
  }

  console.log('✅ Empleado autorizado:', usuario.email);
  req.usuario = usuario;
  next();
}