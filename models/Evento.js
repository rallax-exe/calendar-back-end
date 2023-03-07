const { Schema, model } = require('mongoose');


const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        //Que usuario hizo el registro
        type: Schema.Types.ObjectId,
        //referencia al otro esquema 
        ref: 'Usuario',
        required: true
    }
    
    
});

//Especificar configuraciones del documento
//Cambia el _id a id y quita el __V
//Los cambios no se aplican en la base de datos, solo en el backend

EventoSchema.method('toJSON', function(){
    //Obtiene todas las propiedades del documento
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})



// Exporta un modelo llamado Usuario y el esquema es UsuarioSchema
module.exports = model('Evento', EventoSchema);


