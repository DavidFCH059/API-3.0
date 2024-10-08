const express = require('express');
const router = express.Router();
const devolucionController = require('../Controllers/DevolucionController');

// Obtener todas las devoluciones
router.get('/', devolucionController.getDevoluciones); // Ruta para obtener todas las devoluciones

// Crear una nueva devolución
router.post('/', devolucionController.createDevolucion); // Ruta para crear una nueva devolución

// Editar devolución
router.put('/:id', devolucionController.updateDevolucion); // Ruta para editar una devolución

// Anular devolución
router.delete('/:id', devolucionController.anularDevolucion); // Ruta para anular una devolución

module.exports = router;
