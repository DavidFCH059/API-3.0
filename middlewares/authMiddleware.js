const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = { id: decoded.id }; // Almacena el ID del usuario en la solicitud
            next();
        } catch (error) {
            console.error('Error en la autenticación:', error);
            res.status(401).json({ message: 'No autorizado' });
        }
    } else {
        res.status(401).json({ message: 'No autorizado, no hay token' });
    }
};

module.exports = protect;
