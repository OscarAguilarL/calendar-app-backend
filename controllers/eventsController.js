const { response } = require('express');

const Event = require('../models/Event.model');

const getEvents = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'getEvents',
    });
};
const createEvent = async (req, res = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const eventDb = await event.save();
        return res.json({
            ok: true,
            event: eventDb,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
};

const updateEvent = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'updateEvent',
    });
};

const deleteEvent = (req, res = response) => {
    return res.json({
        ok: true,
        msg: 'deleteEvent',
    });
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
