# 🎮 Inventario Digital Gamer - Backend

API RESTful robusta y escalable para la gestión de inventario y ventas de una tienda de videojuegos. Desarrollado con **Node.js** y **Express.js**, implementando las mejores prácticas de arquitectura backend.

---

## 📋 Descripción

Este proyecto constituye la capa de lógica de negocio y acceso a datos de un sistema completo de gestión comercial. Proporciona endpoints seguros y validados para operaciones CRUD sobre productos, registro de ventas y control automático de inventario.

### ✨ Características principales

- **API RESTful completa**: Endpoints para todas las operaciones del negocio
- **Control de inventario**: Actualización automática de stock tras cada venta
- **Validaciones robustas**: Implementadas con `express-validator` para integridad de datos
- **Manejo de errores**: Respuestas descriptivas y códigos HTTP apropiados
- **Arquitectura modular**: Separación clara entre rutas, controladores y modelos
- **Base de datos MongoDB**: Persistencia eficiente y escalable

---

## 🏗️ Arquitectura del proyecto

```
backend/
│
├── index.js                      # Punto de entrada de la aplicación
│
├── routes/                       # Definición de rutas de la API
│   ├── productos.js              # Rutas para gestión de productos
│   └── ventas.js                 # Rutas para registro de ventas
│
├── controllers/                  # Lógica de negocio
│   ├── productosController.js    # Controlador de productos
│   └── ventasController.js       # Controlador de ventas
│
├── models/                       # Modelos de datos
│   └── producto.js               # Esquema de producto (Mongoose)
│
├── middlewares/                  # Middlewares personalizados
│   └── validaciones.js           # Validaciones con express-validator
│
└── config/                       # Configuraciones
    └── db.js                     # Conexión a MongoDB
```

### Patrón de diseño

El proyecto sigue el patrón **MVC (Model-View-Controller)** adaptado para APIs:
- **Models**: Esquemas y lógica de datos con Mongoose
- **Controllers**: Lógica de negocio y procesamiento de peticiones
- **Routes**: Definición de endpoints y middlewares

---

## 🚀 Endpoints de la API

### 📦 Productos

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/productos` | Obtener todos los productos | No |
| `GET` | `/api/productos/:id` | Obtener un producto por ID | No |
| `POST` | `/api/productos` | Crear nuevo producto | No |
| `PUT` | `/api/productos/:id` | Actualizar producto existente | No |
| `DELETE` | `/api/productos/:id` | Eliminar producto | No |

**Ejemplo de petición POST:**
```json
{
  "nombre": "The Legend of Zelda: TOTK",
  "precio": 59.99,
  "stock": 25,
  "categoria": "Nintendo Switch",
  "descripcion": "Juego de aventura y exploración"
}
```

### 💰 Ventas

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/ventas` | Registrar nueva venta | No |
| `GET` | `/api/ventas` | Obtener historial de ventas | No |

**Ejemplo de petición POST:**
```json
{
  "productoId": "507f1f77bcf86cd799439011",
  "cantidad": 2,
  "cliente": "Juan Pérez"
}
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "mensaje": "Venta registrada exitosamente",
  "venta": {
    "id": "507f1f77bcf86cd799439012",
    "producto": "The Legend of Zelda: TOTK",
    "cantidad": 2,
    "total": 119.98,
    "stockRestante": 23
  }
}
```

---

## ✅ Sistema de validaciones

El backend implementa validaciones exhaustivas usando `express-validator`:

### Validaciones de productos
- ✅ Nombre: requerido, mínimo 3 caracteres
- ✅ Precio: requerido, número positivo
- ✅ Stock: requerido, número entero no negativo
- ✅ Categoría: requerida, formato válido

### Validaciones de ventas
- ✅ ProductoId: requerido, formato MongoDB ObjectId válido
- ✅ Cantidad: requerida, número entero positivo
- ✅ Stock suficiente: validación automática contra inventario

### Respuestas de error
```json
{
  "success": false,
  "errores": [
    {
      "campo": "stock",
      "mensaje": "Stock insuficiente. Disponible: 5, solicitado: 10"
    }
  ]
}
```

---

## 💻 Requisitos del sistema

### Software necesario

| Requisito | Versión mínima |
|-----------|----------------|
| Node.js | 14.x o superior |
| npm | 6.x o superior |
| MongoDB | 4.4 o superior |

### Dependencias principales

```json
{
  "express": "^4.18.0",
  "mongoose": "^7.0.0",
  "express-validator": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.0"
}
```

---

## 🛠️ Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/cristian20252025/Inventario-Digital-Gamer-Bakend.git
cd Inventario-Digital-Gamer-Bakend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Puerto del servidor
PORT=3000

# Conexión a MongoDB
MONGODB_URI=mongodb://localhost:27017/inventario_gamer

# Entorno
NODE_ENV=development
```

### 4. Iniciar MongoDB

**Opción A: MongoDB local**
```bash
mongod
```

**Opción B: MongoDB Atlas (nube)**
- Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Obtén tu connection string
- Actualiza `MONGODB_URI` en `.env`

### 5. Ejecutar el servidor

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

---

## 🔗 Integración con Frontend

Este backend se conecta con el [frontend](https://github.com/cristian20252025/Inventario-Digital-Gamer) desarrollado en HTML, CSS y JavaScript vanilla.

### Ejemplo de consumo desde el frontend:

```javascript
// Obtener productos
async function obtenerProductos() {
  try {
    const response = await fetch('http://localhost:3000/api/productos');
    const productos = await response.json();
    return productos;
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
}

// Registrar venta
async function registrarVenta(venta) {
  try {
    const response = await fetch('http://localhost:3000/api/ventas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(venta)
    });
    return await response.json();
  } catch (error) {
    console.error('Error al registrar venta:', error);
  }
}
```

### Configuración CORS

El backend tiene CORS habilitado para permitir peticiones desde el frontend:

```javascript
app.use(cors({
  origin: 'http://localhost:8000', // URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```

---

## 🧪 Testing

### Probar endpoints con cURL

**Obtener todos los productos:**
```bash
curl http://localhost:3000/api/productos
```

**Crear un producto:**
```bash
curl -X POST http://localhost:3000/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Elden Ring",
    "precio": 49.99,
    "stock": 15,
    "categoria": "PS5"
  }'
```

**Registrar una venta:**
```bash
curl -X POST http://localhost:3000/api/ventas \
  -H "Content-Type: application/json" \
  -d '{
    "productoId": "507f1f77bcf86cd799439011",
    "cantidad": 1,
    "cliente": "María García"
  }'
```

---

## 🎯 Roadmap de mejoras

- [ ] Implementar autenticación JWT
- [ ] Agregar roles y permisos de usuarios
- [ ] Implementar caché con Redis
- [ ] Agregar paginación en listados
- [ ] Crear sistema de reportes y estadísticas
- [ ] Implementar logs con Winston
- [ ] Agregar tests unitarios con Jest
- [ ] Documentación con Swagger/OpenAPI
- [ ] Implementar rate limiting

---

## 📁 Scripts disponibles

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest --watchAll",
    "lint": "eslint ."
  }
}
```

---

## 👥 Equipo de desarrollo

| Nombre | Rol | GitHub |
|--------|-----|--------|
| **Juan Camilo Rojas Arenas** | Backend Developer | [@juancamilorojasarenas](#) |
| **Connie Tatiana Carrillo Bohórquez** | Backend Developer | [@connisita77](#) |
| **Cristian Miguel Pérez Hernández** | Full Stack Developer | [@cristian20252025](https://github.com/cristian20252025) |
| **Kevin Santiago Rivero Rueda** | Backend Developer | [@kevinlevin200](#) |

---

## 🔗 Repositorios relacionados

- **Frontend**: [Inventario Digital Gamer - Frontend](https://github.com/cristian20252025/Inventario-Digital-Gamer)
- **Backend**: [Inventario Digital Gamer - Backend](https://github.com/cristian20252025/Inventario-Digital-Gamer-Bakend) (actual)

---

## 📄 Licencia

Este proyecto es de código abierto y está disponible para fines educativos.

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios con commits descriptivos
4. Push a tu rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request detallado

### Guías de contribución
- Sigue las convenciones de código del proyecto
- Agrega tests para nuevas funcionalidades
- Actualiza la documentación cuando sea necesario
- Asegúrate de que todos los tests pasen antes de hacer PR

---

## 📞 Soporte

¿Encontraste un bug o tienes una sugerencia? 

- 🐛 [Reportar un bug](https://github.com/cristian20252025/Inventario-Digital-Gamer-Bakend/issues/new?labels=bug)
- 💡 [Sugerir una mejora](https://github.com/cristian20252025/Inventario-Digital-Gamer-Bakend/issues/new?labels=enhancement)

---

<div align="center">

[Frontend](https://github.com/cristian20252025/Inventario-Digital-Gamer) • [Backend](https://github.com/cristian20252025/Inventario-Digital-Gamer-Bakend) • [video](https://drive.google.com/drive/folders/1cU8k01p6eZhkaXzyDq-MFDF0UsSC7pwL?usp=sharing)

</div>