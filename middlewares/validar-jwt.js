/*
    Revalidar JWT
*/

const { response } = require('express')
const jwt = require('jsonwebtoken');



const validarJWT = ( req, res = response, next ) => {

    
    //Lee los headers del GET (x-token que se manda en el header)
    const token = req.header('x-token');
    
    //Si no hay token en el header
    if( !token ) {
        //Error de autenticacion
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la validacion'
        });
    };

    try {
        
        //verifica el token existente, que proporciona el header del GET
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED 
        );

        //Recibe el uid y name del token del header del GET, pasa por referencia
        req.uid = uid;
        req.name = name;


    } catch (error) {
        
        //Mensaje de error
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })

    }
    


    next();

}


module.exports = {
    validarJWT
}


