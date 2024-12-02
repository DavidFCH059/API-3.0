const Venta = require('../Models/VentaModel');

// Crear nueva venta
exports.crearVenta = async (req, res) => {
  try {
    const nuevaVenta = new Venta(req.body);
    await nuevaVenta.save();
    res.status(201).json({ message: 'Venta creada con éxito', nuevaVenta });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la venta', error });
  }
};

// Obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find(); // Sin relaciones con otros modelos
    res.status(200).json(ventas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las ventas', error });
  }
};

// Obtener venta por ID
exports.obtenerVentaPorId = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id); // Sin relaciones con otros modelos
    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.status(200).json(venta);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la venta', error });
  }
};

// Actualizar venta
exports.actualizarVenta = async (req, res) => {
  try {
    const ventaActualizada = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ventaActualizada) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.status(200).json({ message: 'Venta actualizada con éxito', ventaActualizada });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la venta', error });
  }
};

// Anular venta
exports.anularVenta = async (req, res) => {
  try {
    const ventaAnulada = await Venta.findByIdAndUpdate(req.params.id, { estado: 'Anulada' }, { new: true });
    if (!ventaAnulada) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.status(200).json({ message: 'Venta anulada con éxito', ventaAnulada });
  } catch (error) {
    res.status(500).json({ message: 'Error al anular la venta', error });
  }
};
