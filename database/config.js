const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.DB_CNN);
        console.log('-----------------------');
        console.log('DB Online');


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar DB');
    }

}

module.exports = {
    dbConnection
}