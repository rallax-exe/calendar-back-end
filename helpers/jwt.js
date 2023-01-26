

const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    //Genera una promesa para manejar los tokens
    return new Promise( (resolve, reject) => {

        //Recibe los datos para generar el token
        const payload = { uid, name };
        //Firma el token con la palabra secreta
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            //Expira en 2 horas el token
            expiresIn: '2h'
        }, (err, token) => {
            //Si hay un error regresa un mensaje
            if( err ){
                console.log(err);
                reject('No se pudo generar el token');
            };

            //Si todo sale bien genera el token
            resolve( token );

        });

    });

};


module.exports = {

    generarJWT

}