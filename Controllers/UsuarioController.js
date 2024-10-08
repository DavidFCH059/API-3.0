const Usuario = require('../Models/UsuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
 
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contrasena');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};
 
exports.registro = async (req, res) => {
  try {
    const { nombre, apellido, email, contrasena } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El email ya está registrado' });
    }
    const salt = await bcrypt.genSalt(10);
    const contrasenaEncriptada = await bcrypt.hash(contrasena, salt);
    const nuevoUsuario = new Usuario({
      nombre,
      apellido,
      email,
      contrasena: contrasenaEncriptada
    });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
 
exports.iniciarSesion = async (req, res) => {
  try {
    const { email, contrasena } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }
    const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!contrasenaValida) {
      return res.status(400).json({ mensaje: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
 
exports.solicitarRecuperacionContrasena = async (req, res) => {
  try {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    const token = crypto.randomBytes(20).toString('hex');
    usuario.tokenRecuperacion = token;
    usuario.expiracionTokenRecuperacion = Date.now() + 3600000; // 1 hora
    await usuario.save();
    // Aquí deberías enviar un email con el token
    res.json({ mensaje: 'Se ha enviado un email para recuperar la contraseña' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
 
exports.cambiarContrasena = async (req, res) => {
  try {
    const { token, nuevaContrasena } = req.body;
    const usuario = await Usuario.findOne({
      tokenRecuperacion: token,
      expiracionTokenRecuperacion: { $gt: Date.now() }
    });
    if (!usuario) {
      return res.status(400).json({ mensaje: 'Token inválido o expirado' });
    }
    const salt = await bcrypt.genSalt(10);
    usuario.contrasena = await bcrypt.hash(nuevaContrasena, salt);
    usuario.tokenRecuperacion = undefined;
    usuario.expiracionTokenRecuperacion = undefined;
    await usuario.save();
    res.json({ mensaje: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};
 
exports.actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, rol, estado } = req.body;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(id, {
      nombre,
      apellido,
      email,
      rol,
      estado
    }, { new: true }).select('-contrasena');
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario' });
  }
};
 
exports.eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioEliminado = await Usuario.findByIdAndDelete(id);
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar usuario' });
  }
};
 