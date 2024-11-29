// Models/CarritoModel.js
const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombreProducto: { type: String, required: true },
    cantidad: { type: Number, required: true },
    precioUnitario: { type: Number, required: true },
    subtotal: { type: Number, required: true }
});

const carritoSchema = new mongoose.Schema({
    productos: [productoSchema],  // Lista de productos en el carrito
    total: { type: Number, required: true }, // Total del carrito
    estado: { type: String, enum: ['activo', 'finalizado'], default: 'activo' } // Estado del carrito
});

module.exports = mongoose.model('Carrito', carritoSchema);
