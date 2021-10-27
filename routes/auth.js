/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');

const router = Router();

router.post(
    '/new',
    [
        // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Debe de ser un email').isEmail(),
        check('password', 'La contraseña debe de ser de 6 caracteres').isLength(
            { min: 6 }
        ),
    ],
    createUser
);

router.post(
    '/',
    [
        // middlewares
        check('email', 'El email es obligatorio').not().isEmpty(),
        check('email', 'Debe de ser un email').isEmail(),
        check('password', 'La contraseña debe de ser de 6 caracteres').isLength(
            { min: 6 }
        ),
    ],
    loginUser
);

router.get('/renew', renewToken);

module.exports = router;
