/*
    Manejo de errores
*/

const { response } = require('express');
const { validationResult } = require('express-validator')

const validarCampos = (req, res = response, next) => {

    //Obtiene los errores de las props del request    
    const errors = validationResult(req);
    // Si hay errores
    if (!errors.isEmpty()) {
        //Respone con los errores y el mensaje 400 bad request
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    };

    //Si no hay errores se ejecuta ejecuta el controlador
    next();

}

module.exports = {

    validarCampos

};