// Importar módulos
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./Routes/authRoutes'); // Importar rutas de autenticación

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear instancia de Express
const app = express();

// Middleware para permitir CORS
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes en formato JSON
app.use(express.json());



// Rutas de autenticación
app.use('/Api/Auth', authRoutes); // Usar las rutas de autenticación



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
