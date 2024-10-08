const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  producto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }, // Cambio: 'Producto' a 'Product'
  cantidad: { type: Number, required: true },
  precioUnitario: { type: Number, required: true }
});

const compraSchema = new mongoose.Schema({
  proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedor', required: true }, // Se mantiene correcto
  fechaDeCompra: { type: Date, required: true },
  subtotal: { type: Number, required: true },
  productos: [productoSchema],
}, { timestamps: true });

const Compra = mongoose.model('Compra', compraSchema);
module.exports = Compra;

