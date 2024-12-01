const mongoose = require('mongoose');

const DevolucionSchema = new mongoose.Schema({
  factura: { type: String, required: true },
  nombreProducto: { type: String, required: true },
  fechaDevolucion: { type: Date, default: Date.now },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  montoTotal: { type: Number, required: true },
  motivo: { type: String, required: true },
  estadoEnvio: { type: String, enum: ['En proceso', 'Cerrado', 'Solicitado'], default: 'En proceso' },
  estadoPedido: {
    type: String,
    enum: [
      'Se solicita a proveedor',
      'Se solicita a otro proveedor',
      'Se entrega producto',
      'Se entrega otro producto'
    ],
    default: 'Se solicita a proveedor'
  }
}, { timestamps: true });

module.exports = mongoose.model('Devolucion', DevolucionSchema);
