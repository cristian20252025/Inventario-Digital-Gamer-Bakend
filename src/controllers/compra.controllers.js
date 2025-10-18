import {
  agregarAlCarrito,
  borrarCarrito,
  verHistorial,
  realizarCompra
} from "../services/compra.services.js";

// 🛒 Agregar producto al carrito
export async function agregarProductoCarrito(req, res) {
  try {
    console.log('\n🛒 ===== AGREGAR AL CARRITO =====');
    console.log('📦 Session completa:', req.session);
    console.log('👤 Usuario en sesión:', req.session?.usuario);
    console.log('🆔 Session ID:', req.sessionID);
    console.log('🍪 Cookies:', req.cookies);
    
    // ✅ Tomar email desde la sesión (ya verificada por middleware)
    const emailUsuario = req.session?.usuario?.email;
    const { idProducto, cantidad } = req.body;

    console.log('📦 Datos recibidos:', { emailUsuario, idProducto, cantidad });

    if (!emailUsuario) {
      console.error('❌ No hay email en sesión');
      console.error('❌ Session completa:', JSON.stringify(req.session, null, 2));
      return res.status(401).json({ 
        error: "Debe iniciar sesión para agregar productos al carrito." 
      });
    }

    const resultado = await agregarAlCarrito(emailUsuario, idProducto, cantidad);
    console.log('✅ Producto agregado al carrito');
    
    res.status(200).json(resultado);

  } catch (error) {
    console.error("❌ Error al agregar al carrito:", error);
    res.status(500).json({ 
      error: error.message || "Error del servidor al agregar al carrito." 
    });
  }
}

// 🧹 Borrar carrito
export async function eliminarCarrito(req, res) {
  try {
    console.log('🧹 Eliminando carrito...');
    
    const emailUsuario = req.session.usuario?.email;

    if (!emailUsuario) {
      console.error('❌ No hay email en sesión');
      return res.status(401).json({ 
        error: "Debe iniciar sesión para eliminar el carrito." 
      });
    }

    const resultado = await borrarCarrito(emailUsuario);
    console.log('✅ Carrito eliminado');
    
    res.status(200).json(resultado);

  } catch (error) {
    console.error("❌ Error al borrar el carrito:", error);
    res.status(500).json({ 
      error: error.message || "Error del servidor al eliminar el carrito." 
    });
  }
}

// 📜 Ver historial de compras
export async function obtenerHistorial(req, res) {
  try {
    console.log('📜 Obteniendo historial...');
    
    const emailUsuario = req.session.usuario?.email;

    if (!emailUsuario) {
      console.error('❌ No hay email en sesión');
      return res.status(401).json({ 
        error: "Debe iniciar sesión para ver su historial de compras." 
      });
    }

    const historial = await verHistorial(emailUsuario);
    console.log(`✅ Historial obtenido: ${historial.length} compras`);
    
    res.status(200).json(historial);

  } catch (error) {
    console.error("❌ Error al obtener el historial:", error);
    res.status(500).json({ 
      error: error.message || "Error del servidor al obtener el historial." 
    });
  }
}

// 💳 Realizar compra
export async function confirmarCompra(req, res) {
  try {
    console.log('💳 Confirmando compra...');
    
    const emailUsuario = req.session.usuario?.email;

    if (!emailUsuario) {
      console.error('❌ No hay email en sesión');
      return res.status(401).json({ 
        error: "Debe iniciar sesión para realizar la compra." 
      });
    }

    console.log('📦 Procesando compra para:', emailUsuario);
    const resultado = await realizarCompra(emailUsuario);
    console.log('✅ Compra realizada exitosamente');
    
    res.status(200).json(resultado);

  } catch (error) {
    console.error("❌ Error al realizar la compra:", error);
    res.status(500).json({ 
      error: error.message || "Error del servidor al procesar la compra." 
    });
  }
}