// Controllers/PedidoController.js
const Pedido = require('../Models/PedidoModel'); // Asegúrate de que la ruta sea correcta

// Crear nuevo pedido (POST)
const crearPedido = async (req, res) => {
    try {
        const { cliente, productos, subtotal, iva, total, metodoPago, direccionEnvio } = req.body;
        const nuevoPedido = new Pedido({
            cliente,
            productos,
            subtotal,
            iva,
            total,
            metodoPago,
            direccionEnvio
        });
        const pedidoGuardado = await nuevoPedido.save();
        res.status(201).json(pedidoGuardado);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el pedido', error });
    }
};

// Obtener todos los pedidos (GET)
const obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.find()
            .populate('cliente')
            .populate('productos.producto'); // Aquí se hace el populate
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pedidos', error });
    }
};

module.exports = { crearPedido, obtenerPedidos };
