// Routes/PedidoRoutes.js
const express = require('express');
const router = express.Router();
const pedidoController = require('../Controllers/PedidoController');

// Ruta para obtener todos los pedidos
router.get('/', pedidoController.obtenerPedidos); // Cambia a 'obtenerPedidos'

// Ruta para crear un nuevo pedido
router.post('/', pedidoController.crearPedido); // Cambia a 'crearPedido'

// Ruta para actualizar un pedido por su ID
router.put('/:id', pedidoController.actualizarPedido);

module.exports = router;
