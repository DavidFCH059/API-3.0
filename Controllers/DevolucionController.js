const Devolucion = require('../Models/DevolucionModel');

// Obtener todas las devoluciones
exports.getDevoluciones = async (req, res) => {
  try {
    const devoluciones = await Devolucion.find();
    res.json(devoluciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las devoluciones', error: error.message });
  }
};

// Crear una nueva devolución
exports.createDevolucion = async (req, res) => {
  try {
    const devolucion = new Devolucion(req.body);
    const nuevaDevolucion = await devolucion.save();
    res.status(201).json(nuevaDevolucion);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la devolución', error: error.message });
  }
};

// Editar devolución
exports.updateDevolucion = async (req, res) => {
  try {
    const devolucion = await Devolucion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!devolucion) return res.status(404).json({ message: 'Devolución no encontrada' });
    res.json(devolucion);
  } catch (error) {
    res.status(500).json({ message: 'Error al editar la devolución', error: error.message });
  }
};

// Anular devolución
exports.anularDevolucion = async (req, res) => {
  try {
    const devolucion = await Devolucion.findByIdAndDelete(req.params.id);
    if (!devolucion) return res.status(404).json({ message: 'Devolución no encontrada' });
    res.json({ message: 'Devolución anulada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al anular la devolución', error: error.message });
  }
};
