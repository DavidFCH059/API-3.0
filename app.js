// Importar módulos
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const rolRutas = require('./Routes/RolRoutes');
const usuarioRoutes = require('./Routes/UsuarioRoutes');
const categoriaRutas = require('./Routes/CategoriaProductoRoutes');
const productoRutas = require('./Routes/ProductoRoutes');
const proveedorRutas = require('./Routes/ProveedorRoutes');
const compraRoutes = require('./Routes/CompraRoutes');
const clientesRoutes = require('./Routes/ClienteRoutes');
const pedidoRoutes = require('./Routes/PedidoRoutes');
const ventaRoutes = require('./Routes/VentasRoutes');
const DevolucionRoutes = require('./Routes/DevolucionRoutes');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear instancia de Express
const app = express();

// Middleware para permitir CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Usar las rutas
app.use('/api/rol', rolRutas);//Si Sirve
app.use('/api/usuario', usuarioRoutes);//Si Sirve
app.use('/api/categorias', categoriaRutas);//Si Sirve
app.use('/api/producto', productoRutas);//Si Sirve
app.use('/api/proveedor', proveedorRutas);//Si Sirve
app.use('/api/compra', compraRoutes);//Si Sirve
app.use('/api/clientes', clientesRoutes);//Si Sirve
app.use('/api/pedido', pedidoRoutes);//No Sirve
app.use('/api/ventas', ventaRoutes);//Si Sirve
app.use('/api/devolucion', DevolucionRoutes); //Si Sirve

// Conectar a MongoDB con Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((error) => console.error('Error conectando a MongoDB:', error));

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API!'); // Respuesta simple al acceder a la raíz
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
