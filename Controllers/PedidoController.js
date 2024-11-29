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

// Actualizar estado del pedido (PUT)
const actualizarEstadoPedido = async (req, res) => {
    const { id } = req.params; // ID del pedido
    const { estado, motivoCancelacion } = req.body; // Nuevo estado y motivo de cancelación si aplica

    try {
        // Validación del estado proporcionado
        const estadosPermitidos = ['pendiente', 'enviado', 'entregado', 'cancelado'];
        if (estado && !estadosPermitidos.includes(estado)) {
            return res.status(400).json({ message: 'Estado no válido' });
        }

        // Actualizar el pedido
        const pedidoActualizado = await Pedido.findByIdAndUpdate(
            id,
            { estado, motivoCancelacion },
            { new: true }
        );

        if (!pedidoActualizado) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.status(200).json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado del pedido', error });
    }
};

module.exports = { crearPedido, obtenerPedidos, actualizarEstadoPedido };
