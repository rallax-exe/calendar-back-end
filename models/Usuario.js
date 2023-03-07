const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String, 
        required: true
    }

});

// Exporta un modelo llamado Usuario y el esquema es UsuarioSchema
module.exports = model('Usuario', UsuarioSchema);


