module.exports = app => {
    const mongoose = require("mongoose");

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
};