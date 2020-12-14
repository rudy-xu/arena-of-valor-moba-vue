module.exports = app => {
    const mongoose = require("mongoose");
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost:27017/arena-of-valor-moba-vue",{
        auth: { authSource: "admin"},
        user: "root",
        pass:"Aa123456",
        useNewUrlParser: true,
        useUnifiedTopology: true
        // "useMongoClient": true

    }).then( () => {
        console.log('successfully connected to the mongodb');
    });

    //Don't know why add this to listen then it can connect successfully
    mongoose.connection.on('error', (err)=>{
        console.log('>> Failed to connect to MongoDB, retrying...');

        setTimeout( () => {
                mongoose.connect(mongoConnectionString, options);
        }, 5000);
    });
    //quote model js to avoid error which would't be quoted
    require("require-all")(__dirname + "/../models");

};