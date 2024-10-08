const mongoose = require('mongoose');

// Esquema para los permisos
const PermisosSchema = new mongoose.Schema({
    crear: { type: Boolean, required: true },
    modificar: { type: Boolean, required: true },
    cambiarEstado: { type: Boolean, required: true },
    ver: { type: Boolean, required: true },
    eliminar: { type: Boolean, required: true },
    listar: { type: Boolean, required: true },
    buscar: { type: Boolean, required: true }
});

// Esquema para el rol
const RolSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    estado: { type: String, required: true },
    permisos: {
        configuracion: { type: PermisosSchema, required: true },
        usuarios: { type: PermisosSchema, required: true },
        compras: { type: PermisosSchema, required: true },
        ventas: { type: PermisosSchema, required: true }
    }
});

const Rol = mongoose.model('Rol', RolSchema);
module.exports = Rol;
