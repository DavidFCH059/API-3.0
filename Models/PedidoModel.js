// Models/Pedido.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema({
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
    productos: [{
        producto: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Asegúrate de que el nombre sea 'Product'
        cantidad: { type: Number, required: true },
        subtotal: { type: Number, required: true }
    }],
    subtotal: { type: Number, required: true },
    iva: { type: Number, required: true },
    total: { type: Number, required: true },
    metodoPago: { type: String, enum: ['efectivo', 'transferencia'], required: true },
    direccionEnvio: { type: String, required: true },
    estado: { type: String, enum: ['pendiente', 'enviado', 'entregado', 'cancelado'], default: 'pendiente' },
    fechaPedido: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
