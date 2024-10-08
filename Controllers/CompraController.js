const Compra = require('../Models/CompraModel');

// Crear una nueva compra
const crearCompra = async (req, res) => {
    try {
        const nuevaCompra = new Compra(req.body);
        await nuevaCompra.save();
        res.status(201).json({ message: 'Compra creada exitosamente', compra: nuevaCompra });
    } catch (error) {
        console.error('Error al crear la compra:', error); // Log para depurar
        res.status(500).json({ message: 'Error al crear la compra', error: error.message });
    }
};

// Leer todas las compras
const leerCompras = async (req, res) => {
    try {
        const compras = await Compra.find()
            .populate('proveedor') // Corregido: se mantiene 'proveedor'
            .populate('productos.producto'); // Corregido: asegurar que sea 'producto' y no otro campo
        res.status(200).json(compras);
    } catch (error) {
        console.error('Error al obtener las compras:', error); // Log el error
        res.status(500).json({ message: 'Error al obtener las compras', error: error.message });
    }
};

// Actualizar una compra
const actualizarCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const compraActualizada = await Compra.findByIdAndUpdate(id, req.body, { new: true });
        if (!compraActualizada) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json({ message: 'Compra actualizada exitosamente', compra: compraActualizada });
    } catch (error) {
        console.error('Error al actualizar la compra:', error); // Log para depurar
        res.status(500).json({ message: 'Error al actualizar la compra', error: error.message });
    }
};

// Eliminar una compra
const eliminarCompra = async (req, res) => {
    try {
        const { id } = req.params;
        const compraEliminada = await Compra.findByIdAndDelete(id);
        if (!compraEliminada) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json({ message: 'Compra eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar la compra:', error); // Log para depurar
        res.status(500).json({ message: 'Error al eliminar la compra', error: error.message });
    }
};

module.exports = {
    crearCompra,
    leerCompras,
    actualizarCompra,
    eliminarCompra,
};
