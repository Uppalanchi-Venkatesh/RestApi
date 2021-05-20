const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        const DBString = process.env.CONNECTION_STRING;
        const options = {
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }
        mongoose.connect(DBString, options).catch(err => console.log(err));
        
        mongoose.connection.on('connected', () => {
            console.log('connected to DB');
        });

        mongoose.connection.on('connecting', () => {
            console.log('trying to connect DB');
        });

        mongoose.connection.on('error', () => {
            console.log('error occurred during connecting to DB');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('you are disconnected from DB');
        });
    },

    disconnect: () => {
        mongoose.disconnect();
    }
}