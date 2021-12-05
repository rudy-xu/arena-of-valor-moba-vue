const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: {type: String},
    password: {
        type: String,
        select: false,  //password can not be select, that is to say, not show in the web page
        set(val) {    //add hash in password to make anyone to see it impossibly 
            return require("bcrypt").hashSync(val,10);   //Generally, set as 10 ~ 12
        }
    },
});

module.exports = mongoose.model("AdminUser", schema);