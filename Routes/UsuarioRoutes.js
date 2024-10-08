const express = require('express');
const router = express.Router();
const controladorUsuario = require('../Controllers/UsuarioController');
 
// Ruta para registrar un nuevo usuario
router.post('/registro', controladorUsuario.registro);
 
// Ruta para iniciar sesión
router.post('/iniciar-sesion', controladorUsuario.iniciarSesion);
 
// Ruta para solicitar recuperación de contraseña
router.post('/recuperar-contrasena', controladorUsuario.solicitarRecuperacionContrasena);
 
// Ruta para cambiar la contraseña
router.post('/cambiar-contrasena', controladorUsuario.cambiarContrasena);
 
// Ruta para obtener todos los usuarios
router.get('/', controladorUsuario.obtenerUsuarios);
 
// Ruta para actualizar un usuario
router.put('/:id', controladorUsuario.actualizarUsuario);
 
// Ruta para eliminar un usuario
router.delete('/:id', controladorUsuario.eliminarUsuario);
 
module.exports = router;
 
 