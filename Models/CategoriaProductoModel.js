const mongoose = require('mongoose');

// Definir el esquema para la categoría
const categoriaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true,
        trim: true
    },
    Observaciones:{
        type: String,
        required: true,
        trim: true
    }
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        default: 'activo'
    }
}, {
    timestamps: true
});

// Crear el modelo
const Categoria = mongoose.model('Categoria', categoriaSchema);

module.exports = Categoria;
