const { request, response } = require('express');
const { validationResult } = require('express-validator');

const createUser = (req = request, res = response) => {
    const { name, email, password } = req.body;
    // manejo de errores
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }

    return res.status(201).json({
        ok: true,
        msg: 'register',
        name,
        email,
        password,
    });
};

const loginUser = (req = request, res = response) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped(),
        });
    }
    res.json({
        ok: true,
        msg: 'login',
        email,
        password,
    });
};

const renewToken = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'renew',
    });
};

module.exports = { createUser, loginUser, renewToken };
