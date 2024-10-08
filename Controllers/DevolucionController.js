const Devolucion = require('../Models/DevolucionModel');

// Obtener todas las devoluciones
exports.getDevoluciones = async (req, res) => {
  try {
    const devoluciones = await Devolucion.find();
    res.status(200).json(devoluciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las devoluciones', error: error.message });
  }
};

// Crear una nueva devolución
exports.createDevolucion = async (req, res) => {
  const { factura, nombreProducto, cantidad, precio, montoTotal, motivo, estadoEnvio, estadoPedido } = req.body;

  try {
    const nuevaDevolucion = new Devolucion({
      factura,
      nombreProducto,
      cantidad,
      precio,
      montoTotal,
      motivo,
      estadoEnvio,
      estadoPedido,
    });

    const devolucionGuardada = await nuevaDevolucion.save();
    res.status(201).json(devolucionGuardada);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la devolución', error: error.message });
  }
};

// Editar devolución
exports.updateDevolucion = async (req, res) => {
  const { id } = req.params;
  const { estadoEnvio, estadoPedido } = req.body;

  try {
    const devolucion = await Devolucion.findByIdAndUpdate(
      id,
      { estadoEnvio, estadoPedido },
      { new: true }
    );

    if (!devolucion) {
      return res.status(404).json({ message: 'Devolución no encontrada' });
    }

    res.status(200).json(devolucion);
  } catch (error) {
    res.status(500).json({ message: 'Error al editar la devolución', error: error.message });
  }
};

// Anular devolución
exports.anularDevolucion = async (req, res) => {
  const { id } = req.params;

  try {
    const devolucion = await Devolucion.findByIdAndDelete(id);

    if (!devolucion) {
      return res.status(404).json({ message: 'Devolución no encontrada' });
    }

    res.status(200).json({ message: 'Devolución anulada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al anular la devolución', error: error.message });
  }
};
