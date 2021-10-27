const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

const createUser = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo',
            });
        } else {
            user = new User(req.body);

            // encriptar contraseña
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, salt);

            await user.save();
            return res.status(201).json({
                ok: true,
                uid: user.id,
                name: user.name,
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
};

const loginUser = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe',
            });
        } else {
            // confirmar los passwords
            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Password incorrecto',
                });
            } else {
                // generar JWT

                return res.json({
                    ok: true,
                    uid: user.id,
                    name: user.name,
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador',
        });
    }
};

const renewToken = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'renew',
    });
};

module.exports = { createUser, loginUser, renewToken };
