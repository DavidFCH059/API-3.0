const mongoose = require('mongoose');

// Esquema para el rol
const RolSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true },
    permisos: {
        crear: { type: Boolean, required: true },
        modificar: { type: Boolean, required: true },
        cambiarEstado: { type: Boolean, required: true },
        ver: { type: Boolean, required: true },
        eliminar: { type: Boolean, required: true },
        listar: { type: Boolean, required: true },
        buscar: { type: Boolean, required: true }
    }
});

const Rol = mongoose.model('Rol', RolSchema);
module.exports = Rol;

