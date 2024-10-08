const express = require('express');
const clienteController = require('../Controllers/ClienteController');
const router = express.Router();
 
// Crear cliente
router.post('/', clienteController.crearCliente);
 
// Obtener todos los clientes
router.get('/', clienteController.obtenerClientes);
 
// Obtener cliente por ID
router.get('/:id', clienteController.obtenerClientePorId);
 
// Actualizar cliente
router.put('/:id', clienteController.actualizarCliente);
 
// Eliminar cliente
router.delete('/:id', clienteController.eliminarCliente);
 
module.exports = router;