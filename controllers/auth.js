const { request, response } = require('express');
const User = require('../models/User.model');

const createUser = async (req = request, res = response) => {
    // const { name, email, password } = req.body;

    try {
        const user = new User(req.body);
        await user.save();
        return res.status(201).json({
            ok: true,
            msg: 'register',
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
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
