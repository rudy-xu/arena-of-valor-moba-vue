const express = require("express");

const app = express();


app.use(require("cors")());
app.use(express.json());

/**
 * Make upload file visible
 * In NodeJs, must have router to make upload file accessible
 * Define specific router (static file hosting)
 */
app.use("/uploads", express.static(__dirname + "/uploads"));


//connect DB
require("./plugins/mongo")(app);

//api router
//admin/api/categories
require("./router/admin")(app);


app.listen(3000, () => {
    console.log("http://localhost:3000");
});