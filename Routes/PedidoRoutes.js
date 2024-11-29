const express = require('express');
const router = express.Router();
const pedidoController = require('../Controllers/PedidoController');

// Ruta para obtener todos los pedidos
router.get('/', pedidoController.obtenerPedidos);

// Ruta para crear un nuevo pedido
router.post('/', pedidoController.crearPedido);

// Ruta para actualizar el estado del pedido por su ID
router.put('/:id', pedidoController.actualizarEstadoPedido);

// Ruta para actualizar todo el pedido por su ID
router.put('/actualizar/:id', pedidoController.actualizarPedidoCompleto);

// Ruta para eliminar un pedido por su ID
router.delete('/:id', pedidoController.eliminarPedido);

module.exports = router;
