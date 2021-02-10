const express = require('express');
const withAuth = require('../middleware/auth')
const sanitizeData = require('../middleware/sanitize')
const authController = require('../controllers/auth.controller')
const router = express.Router();

router.post('/register', sanitizeData, authController.register)

router.post('/authenticate', authController.login)

router.get('/checktoken', authController.verifyJWT)

router.post('/logout', authController.logout)

module.exports = router;