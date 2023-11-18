const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationMiddleware');
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protegido', authenticateToken, authController.acessoPermitido);

module.exports = router;

