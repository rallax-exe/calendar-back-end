const { Schema, model } = require('mongoose');


const EventoSchema = Schema({

    title: {
        type: String,
        require: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        require: true
    },
    end: {
        type: Date,
        require: true
    },
    user: {
        //Que usuario hizo el registro
        type: Schema.Types.ObjectId,
        //referencia al otro esquema 
        ref: 'Usuario'
    }
    
    
});

// Exporta un modelo llamado Usuario y el esquema es UsuarioSchema
module.exports = model('Evento', EventoSchema);


