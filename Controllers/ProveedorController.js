const Proveedor = require('../Models/ProveedorModel');

// Crear un nuevo proveedor
exports.crearProveedor = async (req, res) => {
  try {
    const nuevoProveedor = new Proveedor(req.body);
    await nuevoProveedor.save();
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear proveedor', error });
  }
};

// Obtener todos los proveedores
exports.obtenerProveedores = async (req, res) => {
  try {
    const proveedores = await Proveedor.find();
    res.status(200).json(proveedores);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proveedores', error });
  }
};

// Obtener un proveedor por ID
exports.obtenerProveedorPorId = async (req, res) => {
  try {
    const proveedor = await Proveedor.findById(req.params.id);
    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.status(200).json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proveedor', error });
  }
};

// Actualizar un proveedor
exports.actualizarProveedor = async (req, res) => {
    try {
      const proveedorActualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!proveedorActualizado) {
        return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
      }
      res.status(200).json(proveedorActualizado);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar proveedor', error });
    }
};

// Eliminar un proveedor
exports.eliminarProveedor = async (req, res) => {
  try {
    const proveedorEliminado = await Proveedor.findByIdAndDelete(req.params.id);
    if (!proveedorEliminado) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }
    res.status(200).json({ mensaje: 'Proveedor eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar proveedor', error });
  }
};
