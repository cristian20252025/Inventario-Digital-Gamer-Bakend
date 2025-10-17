// src/dto/compras.dto.js
import { body } from "express-validator";

export const agregarAlCarritoDTO = [
  body("idProducto")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("El id del producto es obligatorio."),
  body("cantidad")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser un número entero positivo."),
];
