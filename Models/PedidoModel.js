const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    nombreCliente: { type: String, required: true },
    correoCliente: { type: String, required: true },
    telefonoCliente: { type: String, required: true },
    productos: [{
        nombreProducto: { type: String, required: true },
        cantidad: { type: Number, required: true },
        precioUnitario: { type: Number, required: true },
        subtotal: { type: Number, required: true }  // El subtotal de cada producto (cantidad * precio)
    }],
    subtotal: { type: Number, required: true },  // El subtotal total de los productos
    total: { type: Number, required: true },  // El total (subtotal)
    metodoPago: { type: String, enum: ['efectivo', 'tarjeta', 'transferencia'], required: true },
    direccionEnvio: { type: String, required: true },
    estado: { type: String, enum: ['pendiente', 'enviado', 'entregado', 'cancelado'], default: 'pendiente' },
    fechaPedido: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
