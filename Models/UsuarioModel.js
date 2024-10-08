const mongoose = require('mongoose');
 
const esquemaUsuario = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contrasena: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['admin', 'usuario', 'invitado'],
    default: 'usuario'
  },
  estado: {
    type: String,
    enum: ['activo', 'inactivo'],
    default: 'activo'
  },
  tokenRecuperacion: String,
  expiracionTokenRecuperacion: Date
});
 
module.exports = mongoose.model('Usuario', esquemaUsuario);
 