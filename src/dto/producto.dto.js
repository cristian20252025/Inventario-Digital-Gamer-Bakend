import { body, query } from "express-validator";

// 🛠️ DTO para crear producto
export const crearProductoDTO = [
  body("id")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El id es obligatorio y debe ser texto."),

  body("nombre")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio."),

  body("precio")
    .isFloat({ min: 0.01 })
    .withMessage("El precio debe ser un número positivo."),

  body("cantidad_disponible")
    .isInt({ min: 0 })
    .withMessage("La cantidad disponible debe ser un entero positivo o cero."),

  body("descripcion")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria."),
];

// ✏️ DTO para modificar producto (permite campos opcionales)
export const modificarProductoDTO = [
  body("id")
    .optional()
    .isString()
    .trim()
    .withMessage("El id debe ser texto."),
  body("nombre")
    .optional()
    .isString()
    .trim()
    .withMessage("El nombre debe ser texto."),
  body("precio")
    .optional()
    .isFloat({ min: 0.01 })
    .withMessage("El precio debe ser un número positivo."),
  body("cantidad_disponible")
    .optional()
    .isInt({ min: 0 })
    .withMessage("La cantidad disponible debe ser un entero positivo o cero."),
  body("descripcion")
    .optional()
    .isString()
    .trim()
    .withMessage("La descripción debe ser texto."),
];

// 🔍 DTO para buscar o eliminar producto (id o nombre)
export const buscarEliminarProductoDTO = [
  query("id")
    .optional()
    .isString()
    .trim()
    .withMessage("El id debe ser texto."),
  query("nombre")
    .optional()
    .isString()
    .trim()
    .withMessage("El nombre debe ser texto."),
];
