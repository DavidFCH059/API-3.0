const express = require('express');
const router = express.Router();
const VentaController = require('../Controllers/VentaController');

router.post('/', VentaController.crearVenta); // Crear una venta
router.get('/', VentaController.obtenerVentas); // Obtener todas las ventas
router.get('/:id', VentaController.obtenerVentaPorId); // Obtener venta por ID
router.put('/:id', VentaController.actualizarVenta); // Actualizar venta
router.delete('/:id', VentaController.anularVenta); // Anular venta

module.exports = router;
