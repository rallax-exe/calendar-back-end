//esto es para mantener el tipado al programar
const { response } = require('express');

//Referencia al modelo
const Evento = require('../models/Evento');


const getEventos =  async(req, res = response) => {

    //Obtener todos los eventos de las base de datos
    //Datos de usuario relacionado con el evento, solo queremos el name
    //Si no se pone la condicion trae todos los datos del usuario
    const eventos = await Evento.find().populate('user','name');

    try {
        
        res.status(201).json({
            ok: true,
            eventos
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
        
    }

};


const crearEvento = async(req, res = response) => {

    //Crea un nuevo objeto literal con las props que se reciben
    const evento = new Evento( req.body );

    
    try {

        //Agrega la prop uid al evento
        //El uid lo recibe del JWT cuando paso por referencia al validar el JWT
        evento.user = req.uid;
    
        //Intenta grabar en DB las notas
        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


const actualizarEvento =  async(req, res = response) => {

    //Obtiene el id del evento de las props de la url
    const eventoId = req.params.id;


    try {
        
        //Busca en el DB el evento por su id, que recibe en las props
        const evento = await Evento.findById( eventoId );

        //uid del usuario -> jwt
        const uid = req.uid;

        //Si el evento no existe
        if ( !evento ) {

            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });

        }

        //Si la persona que creo el evento es la misma que actualiza
        //toString convierte el JSON a string
        if ( evento.user.toString() !== uid ){

            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });

        }

        //Si pasa todas las validaciones
        const nuevoEvento = {
            //copia todas las props del objeto
            ...req.body,
            //agrega la props user 
            user: uid

        };

        //En db pide que id se actualiza, despues los datos que se actualizan
        //new es para que regrese el nuevo evento actualizado
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, {new: true} );

        res.json({
            ok: true,
            evento: eventoActualizado
        });


    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
        
    };

};

const eliminarEvento = async(req, res = response) => {

    //Obtiene el id del evento de las props de la url
    const eventoId = req.params.id;


    try {
        
        //Busca en el DB el evento por su id, que recibe en las props
        const evento = await Evento.findById( eventoId );

        //uid del usuario -> jwt
        const uid = req.uid;

        //Si el evento no existe
        if ( !evento ) {

            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });

        }

        //Si la persona que creo el evento es la misma que actualiza
        //toString convierte el JSON a string
        if ( evento.user.toString() !== uid ){

            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para eliminar este evento'
            });

        }


        //En db pide que id se elimina
        await Evento.findByIdAndDelete( eventoId );

        res.status(500).json({
            ok: true,
            msg: 'El evento ha sido eliminado'
        });


    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
        
    };

};

//Exporta la funciones como lo requiere node
module.exports = {

    actualizarEvento,
    crearEvento,
    eliminarEvento,
    getEventos,

}

