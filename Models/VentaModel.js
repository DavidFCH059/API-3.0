const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentaSchema = new Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  documento: {
    type: String,
    required: true
  },
  productos: [{
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    },
    precioUnitario: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['Pagado', 'Cancelado', 'Anulada'],
    default: 'Pagado'
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  aplicarIVA: {
    type: Boolean,
    default: false
  },
  iva: {
    type: Number,
    default: 0
  },
  subtotal: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Venta', VentaSchema);
