const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un correo válido.']
  },
  telefono: {
    type: String,
    required: true,
    match: [/^\d+$/, 'Por favor ingrese un número de teléfono válido.']
  },
  direccion: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: true
  },
  calificacion: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'La calificación debe ser un número entero.'
    }
  }
});

module.exports = mongoose.model('Cliente', ClienteSchema);

