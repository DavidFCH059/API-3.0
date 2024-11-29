// Routes/CarritoRoutes.js
const express = require('express');
const router = express.Router();
const carritoController = require('../Controllers/CarritoController');

// Ruta para obtener el carrito
router.get('/', carritoController.obtenerCarrito);

// Ruta para crear un nuevo carrito
router.post('/', carritoController.crearCarrito);

// Ruta para actualizar el carrito (agregar o quitar productos)
router.put('/:id', carritoController.actualizarCarrito);

// Ruta para eliminar un carrito (finalizarlo)
router.delete('/:id', carritoController.eliminarCarrito);

module.exports = router;
