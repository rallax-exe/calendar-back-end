/*
    Rutas de usuarios / events
    El dominio es:
    <dominio>/api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { actualizarEvento, eliminarEvento, getEventos, crearEvento } = require('../controllers/events'); 
const router = Router();


//Todas tienen que pasar por la validacion del JWT
router.use( validarJWT );


//Todas las peticiones tiene que ser validadas (JWT)
//Obtener eventos
router.get(
    '/',
    getEventos
);

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').notEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de fin es obligatoria').custom( isDate ),
    ],
    validarCampos,
    crearEvento
);

router.put(
    '/:id',
    actualizarEvento
);

router.delete(
    '/:id',
    eliminarEvento
);

module.exports = router;


//Crear un nuevo evento
    //router.post('/', crearEvento);

//Actualizar evento
    //router.put('/:id', actualizarEvento);

//Eliminar evento
    //router.delete('/:id', eliminarEvento);