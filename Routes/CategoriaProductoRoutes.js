const express = require('express');
const router = express.Router();
const categoriaController = require('../Controllers/CategoriaProductoController');

// Ruta para crear una nueva categoría
router.post('/', categoriaController.crearCategoria);

// Ruta para obtener todas las categorías
router.get('/', categoriaController.obtenerCategorias);

// Ruta para actualizar una categoría por ID
router.put('/:id', categoriaController.actualizarCategoria);

// Ruta para eliminar una categoría por ID
router.delete('/:id', categoriaController.eliminarCategoria);

module.exports = router;
