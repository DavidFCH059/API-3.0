const express = require('express');
const router = express.Router();
const rolController = require('../Controllers/rolController');

// Crear un nuevo rol
router.post('/', rolController.crearRol);

// Obtener todos los roles
router.get('/', rolController.obtenerRoles);

// Obtener un rol por ID
router.get('/:id', rolController.obtenerRolPorId);

// Actualizar un rol
router.put('/:id', rolController.actualizarRol);

// Eliminar un rol
router.delete('/:id', rolController.eliminarRol);

module.exports = router;
