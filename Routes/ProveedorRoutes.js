const express = require('express');
const router = express.Router();
const proveedorController = require('../Controllers/ProveedorController');

// Ruta para crear proveedor
router.post('/', proveedorController.crearProveedor);

// Ruta para obtener todos los proveedores
router.get('/', proveedorController.obtenerProveedores);

// Ruta para obtener un proveedor por ID
router.get('/:id', proveedorController.obtenerProveedorPorId);

// Ruta para actualizar un proveedor
router.put('/:id', proveedorController.actualizarProveedor);

// Ruta para eliminar un proveedor
router.delete('/:id', proveedorController.eliminarProveedor);

module.exports = router;
