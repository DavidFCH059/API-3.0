const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../Controllers/authController');
const protect = require('../middlewares/authMiddleware'); // Importa el middleware

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile); // Ruta protegida

module.exports = router;
