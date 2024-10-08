const Categoria = require('../Models/CategoriaProductoModel');

// Crear una nueva categoría
exports.crearCategoria = async (req, res) => {
    try {
        const nuevaCategoria = new Categoria(req.body);
        await nuevaCategoria.save();
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la categoría', error });
    }
};

// Obtener todas las categorías
exports.obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener categorías', error });
    }
};

// Actualizar una categoría
exports.actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, req.body, { new: true });
        if (!categoriaActualizada) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        res.status(200).json(categoriaActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar la categoría', error });
    }
};

// Eliminar una categoría
exports.eliminarCategoria = async (req, res) => {
    const { id } = req.params;
    try {
        const categoriaEliminada = await Categoria.findByIdAndDelete(id);
        if (!categoriaEliminada) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        res.status(200).json({ mensaje: 'Categoría eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la categoría', error });
    }
};
