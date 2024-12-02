const express = require('express');
const router = express.Router();
const VentaController = require('../Controllers/VentaController');

// Crear una venta
router.post('/', VentaController.crearVenta);

// Obtener todas las ventas
router.get('/', VentaController.obtenerVentas);

// Obtener venta por ID
router.get('/:id', VentaController.obtenerVentaPorId);

// Actualizar venta
router.put('/:id', VentaController.actualizarVenta);

// Anular venta
router.delete('/:id', VentaController.anularVenta);

module.exports = router;

