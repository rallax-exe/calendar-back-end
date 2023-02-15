//esto es para mantener el tipado al programar
const { response } = require('express');

const getEventos =  (req, res = response) => {

    try {
        
        res.status(201).json({
            ok: true,
            msg: 'getEventos'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
        
    }

};


const crearEvento = (req, res = response) => {

    //verificar que tenga el evento
    res.status(201).json({
        ok: true,
        msg: 'crearEvento'
    });

};


const actualizarEvento =  (req, res = response) => {

    try {
        
        res.status(201).json({
            ok: true,
            msg: 'actualizarEvento'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
        
    }

};

const eliminarEvento = (req, res = response) => {

    try {
        
        res.status(201).json({
            ok: true,
            msg: 'deleteEvento'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
        
    }

};

//Exporta la funciones como lo requiere node
module.exports = {

    actualizarEvento,
    crearEvento,
    eliminarEvento,
    getEventos,

}

