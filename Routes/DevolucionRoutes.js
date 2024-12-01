const express = require('express');
const router = express.Router();
const {
  getDevoluciones,
  createDevolucion,
  updateDevolucion,
  anularDevolucion
} = require('../Controllers/DevolucionController');

router.get('/', getDevoluciones); // Obtener todas las devoluciones
router.post('/', createDevolucion); // Crear una nueva devolución
router.put('/:id', updateDevolucion); // Editar una devolución
router.delete('/:id', anularDevolucion); // Anular una devolución

module.exports = router;
