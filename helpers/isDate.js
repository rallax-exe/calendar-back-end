const moment = require('moment');

//Custom validator


const isDate = ( value ) => {

    //Si ese campo no existe exprres validator mandara msg de err
    if( !value ){
        return false
    }

    const fecha = moment( value );

    //Moment verifica si la fecha es valida
    if( fecha.isValid() ){

        return true;

    } else {

        return false;

    }

}


module.exports = {
    isDate
};
