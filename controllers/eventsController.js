const { response } = require('express');

const Event = require('../models/Event.model');

const getEvents = async (req, res = response) => {
    const events = await Event.find().populate('user', 'name');

    return res.json({
        ok: true,
        events,
    });
};

const createEvent = async (req, res = response) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const eventDb = await event.save();
        return res.status(201).json({
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

const updateEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const { uid } = req;

    try {
        const eventFind = await Event.findById(eventId);

        if (!eventFind) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado',
            });
        }

        if (eventFind.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento',
            });
        }

        const newEvent = {
            ...req.body,
            user: uid,
        };

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
            new: true,
        });

        return res.json({
            ok: true,
            event: eventUpdated,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
};

const deleteEvent = async (req, res = response) => {
    const eventId = req.params.id;
    const { uid } = req;

    try {
        const eventFind = await Event.findById(eventId);

        if (!eventFind) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado',
            });
        }

        if (eventFind.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento',
            });
        }

        await Event.findByIdAndDelete(eventId);

        return res.json({ ok: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
};

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
};
