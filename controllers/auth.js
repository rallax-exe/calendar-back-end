//esto es para mantener el tipado al programar
const { response } = require('express');


const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');



/*
    req -> lo que el usuario solicita
    res -> lo que el back end responde

    async -> porque es una peticion a DB
*/
const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        /*
            Busca en la DB si el correo existe  
            en los registros
        */
        let usuario = await Usuario.findOne({ email });

        /*
            Si el correo ya existe, regresa un bad request
            y un mensaje para el usario
        */
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        /*
            Crea una instancia de un nuevo usuario,
            le manda los campos en las props que 
            posteriormente lo recibira mongoose,
            las props son los datos del usuario
        */
        usuario = new Usuario(req.body);


        /*
            Encriptar contrasenia
        */
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        

        /*
            Cuando se tiene la instacia lista,
            se manda a la base de datos en 
            MongoDB
        */
        await usuario.save();

        //Genera el token con las props que requiere el JWT
        const token = await generarJWT( usuario.id, usuario.name );

        /*
            Esto es la respuesta de la peticion
            del usuario
        */
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    };

};

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Busca el usuario en la DB con su correo
        const usuario = await Usuario.findOne({ email });

        //Si no existe
        if ( !usuario) {
            //Bad request
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        };

        //Compara la contrasenia del usuario con la de la base de datos
        const validPassword = bcrypt.compareSync( password, usuario.password );

        //Si la contrasenia es incorrecta
        if( !validPassword ){
            //Bad request
            return res.status(400).json({
                ok: false,
                msg: 'Email o password incorrecto'
            });
        };

        //Genera el token
        const token = await generarJWT( usuario.id, usuario.name );

        //Si el usuario es validado regresa estos datos
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    };

};

const revalidarToken = async(req, res) => {

    //Obtiene los datos porque se pasaron por referencia al el validar jwt
    const { uid, name } = req;
    
    //Genera un nuevo token
    const token = await generarJWT( uid, name );

    //Esto es la respuesta de la peticion
    res.json({
        ok: true,
        uid,
        name,
        token
    });

};


//Exporta la funciones como lo requiere node
module.exports = {

    crearUsuario,
    loginUsuario,
    revalidarToken

}