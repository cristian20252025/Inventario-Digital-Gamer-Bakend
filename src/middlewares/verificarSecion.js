// src/middlewares/verificarSesion.js
export function verificarSesion(req, res, next) {
  const usuario = req.cookies.usuario;
  if (!usuario || usuario.tipo !== "usuario") {
    return res.status(401).json({ error: "Debe iniciar sesión como cliente para continuar." });
  }
  req.usuario = usuario;
  next();
}
