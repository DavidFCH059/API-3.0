const express = require('express');
const { crearCompra, leerCompras, actualizarCompra, eliminarCompra } = require('../Controllers/CompraController');
const router = express.Router();
 
// Crear compra
router.post('/', crearCompra);
 
// Obtener todas las compras
router.get('/', leerCompras);
 
// Actualizar una compra
router.put('/:id', actualizarCompra);
 
// Eliminar una compra
router.delete('/:id', eliminarCompra);
 
module.exports = router;