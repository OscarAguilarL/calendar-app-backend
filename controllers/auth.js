const { request, response } = require('express');

const createUser = (req = request, res = response) => {
    const { name, email, password } = req.body;

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
