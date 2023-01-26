const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({

    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    password: {
        type: String, 
        require: true
    }

});

// Exporta un modelo llamado Usuario y el esquema es UsuarioSchema
module.exports = model('Usuario', UsuarioSchema);


