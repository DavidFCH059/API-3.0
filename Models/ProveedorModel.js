const mongoose = require('mongoose');

const proveedorSchema = new mongoose.Schema({
  nit: { type: String, required: true, unique: true },
  nombreEmpresa: { type: String, required: true },
  personaContacto: { type: String, required: true },
  telefono: { type: String, required: true },
  direccion: { type: String, required: true },
  ciudad: { type: String, required: true },
  estado: { type: String, required: true },
  codigoPostal: { type: String, required: true },
  correoElectronico: { type: String, required: true },
  estadoProveedor: { type: String, default: 'activo' }
});

module.exports = mongoose.model('Proveedor', proveedorSchema);
