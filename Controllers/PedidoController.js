const Pedido = require('../Models/PedidoModel');

// Crear nuevo pedido (POST)
const crearPedido = async (req, res) => {
    try {
        const { nombreCliente, correoCliente, telefonoCliente, productos, metodoPago, direccionEnvio } = req.body;

        // Calcular subtotal y total
        let subtotal = 0;
        productos.forEach(producto => {
            subtotal += producto.subtotal;  // Cada producto tiene un campo 'subtotal' ya calculado
        });
        const total = subtotal;  // El total es igual al subtotal sin IVA

        const nuevoPedido = new Pedido({
            nombreCliente,
            correoCliente,
            telefonoCliente,
            productos,
            subtotal,
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
        const pedidos = await Pedido.find();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pedidos', error });
    }
};

// Actualizar estado del pedido (PUT)
const actualizarEstadoPedido = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        const pedidoActualizado = await Pedido.findByIdAndUpdate(id, { estado }, { new: true });

        if (!pedidoActualizado) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.status(200).json(pedidoActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el estado del pedido', error });
    }
};

// Eliminar pedido (DELETE)
const eliminarPedido = async (req, res) => {
    const { id } = req.params;

    try {
        const pedidoEliminado = await Pedido.findByIdAndDelete(id);

        if (!pedidoEliminado) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        res.status(200).json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el pedido', error });
    }
};

module.exports = { crearPedido, obtenerPedidos, actualizarEstadoPedido, eliminarPedido };
