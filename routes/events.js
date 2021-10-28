/**
 * Rutas de Eventos
 * host + /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');

const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventsController');
const { isDate } = require('../helpers/isDate');
const { fieldValidators } = require('../middlewares/fieldValidators');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

// Todas tienen que pasar por la validación del JWT
router.use(validateJWT);

// Obtener eventos
router.get('/', getEvents);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio no es valida').custom(isDate),
        check('end', 'Fecha fin obligatorio').not().isEmpty(),
        check('end', 'Fecha fin no es valida').custom(isDate),
        fieldValidators,
    ],
    createEvent
);

// Actualizar un nuevo evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio obligatorio').not().isEmpty(),
        check('start', 'Fecha inicio no es valida').custom(isDate),
        check('end', 'Fecha fin obligatorio').not().isEmpty(),
        check('end', 'Fecha fin no es valida').custom(isDate),
        fieldValidators,
    ],
    updateEvent
);

// Eliminar un nuevo evento
router.delete('/:id', deleteEvent);

module.exports = router;
