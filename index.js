const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

/*
    - Crear el servidor de express -
*/
const app = express(); 

// Base de datos
dbConnection();


/*
    CORS
*/
app.use(cors());


/*
    - Directorio publico / un middleware -
    Midleware - funcion que se ejecuta en una peticion
*/
app.use( express.static('public') );

/*
    - Lectura y parseo del body -
    Las peticiones que vengan en formato JSON
    las procesa y obtiene su contenido
*/
app.use( express.json() );

/* 
    - RUTAS -
    -> Todo lo que se exporta se habilita en la ruta /api/auth
    -> Esto crea la ruta, como lo hace Routes en React
*/
app.use( '/api/auth', require('./routes/auth') );


/*
    - Escuchar peticiones -
    El callback se ejecuta cuando se inicia la app
*/
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});