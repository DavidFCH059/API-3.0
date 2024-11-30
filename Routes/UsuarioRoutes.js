const express = require('express');
const router = express.Router();
const controladorUsuario = require('../Controllers/UsuarioController');

// Ruta para obtener todos los usuarios
router.get('/', controladorUsuario.obtenerUsuarios);

// Ruta para crear un nuevo usuario
router.post('/', controladorUsuario.crearUsuario);

// Ruta para actualizar un usuario
router.put('/:id', controladorUsuario.actualizarUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', controladorUsuario.eliminarUsuario);

module.exports = router;
