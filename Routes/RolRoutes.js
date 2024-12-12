const express = require('express');
const rolController = require('../Controllers/RolController');
const router = express.Router();

// Crear rol
router.post('/', rolController.crearRol);

// Obtener todos los roles
router.get('/', rolController.obtenerRoles);

// Obtener rol por ID
router.get('/:id', rolController.obtenerRolPorId);

// Actualizar rol
router.put('/:id', rolController.actualizarRol);

// Eliminar rol
router.delete('/:id', rolController.eliminarRol);

module.exports = router;

