/*
    Rutas de usuarios / Auth
    El dominio es:
    <dominio>/api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth'); 

const router = Router();


//Rutas (endpoints) - como en React

router.post(
    '/', 
    [ // coleccion de middlewares para validar el post
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ], 
    loginUsuario
);

router.post(
    '/new', 
    [ // coleccion de middlewares para validar el post
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    crearUsuario 
);

router.get(
    '/renew',
    validarJWT,
    revalidarToken
);

module.exports = router;
