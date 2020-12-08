const express = require("express");

const app = express();


app.use(require("cors")());
app.use(express.json());


//connect DB
require("./plugins/mongo")(app);

//api router
//admin/api/categories
require("./router/admin")(app);


app.listen(3000, () => {
    console.log("http://localhost:3000");
});