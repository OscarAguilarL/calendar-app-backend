/**
 * Rutas de Eventos
 * host + /api/events
 */

const { Router } = require('express');

const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventsController');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();

// Todas tienen que pasar por la validación del JWT
router.use(validateJWT);

// Obtener eventos
router.get('/', getEvents);

// Crear un nuevo evento
router.post('/', createEvent);

// Actualizar un nuevo evento
router.put('/:id', updateEvent);

// Eliminar un nuevo evento
router.delete('/:id', deleteEvent);

module.exports = router;
