# Inventario Digital Gamer - Backend

Este proyecto es el backend de una aplicación de inventario y ventas para una tienda de videojuegos. Está construido con **Node.js**, utilizando **Express.js** para la creación de una API RESTful que gestiona productos, ventas y validaciones.

## Funcionalidades principales

- CRUD de productos (crear, leer, actualizar, eliminar)
- Registro de ventas con control automático de stock
- Validaciones con `express-validator` para datos seguros
- Respuestas claras ante errores como stock insuficiente o datos inválidos

## Estructura del proyecto

```
backend/
├── index.js
├── routes/
│   ├── productos.js
│   └── ventas.js
├── controllers/
│   ├── productosController.js
│   └── ventasController.js
├── models/
│   └── producto.js
├── middlewares/
│   └── validaciones.js
└── config/
    └── db.js
```

## Endpoints disponibles

### Productos

- `GET /api/productos` → Listar todos los productos
- `POST /api/productos` → Crear un nuevo producto
- `PUT /api/productos/:id` → Actualizar un producto existente
- `DELETE /api/productos/:id` → Eliminar un producto

### Ventas

- `POST /api/ventas` → Registrar una venta (descuenta stock automáticamente)

## Validaciones

Las rutas incluyen validaciones con `express-validator` y retornan errores claros si los datos son inválidos. Ejemplos:

- Stock insuficiente
- Campos requeridos vacíos
- Formato incorrecto

## Requisitos para correr el proyecto

- Node.js instalado
- MongoDB local o en la nube
- Configurar variables de entorno si aplica

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/cristian20252025/Inventario-Digital-Gamer-Bakend.git
cd Inventario-Digital-Gamer-Bakend
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el servidor:

```bash
node index.js
```

## Conexión con el frontend

Este backend se comunica con un frontend desarrollado en HTML, CSS y JavaScript puro. La conexión se realiza mediante `fetch()` apuntando a las rutas de la API.

Ejemplo:

```javascript
fetch('http://localhost:3000/api/productos')
```
