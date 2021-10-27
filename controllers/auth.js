const { request, response } = require('express');

const createUser = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'register',
    });
};

const loginUser = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'login',
    });
};

const renewToken = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'renew',
    });
};

module.exports = { createUser, loginUser, renewToken };
