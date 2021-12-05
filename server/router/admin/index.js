module.exports = app => {
    const express = require("express");
    const assert = require("http-assert");
    const jwt = require("jsonwebtoken");
    const AdminUser = require("../../models/AdminUser");
    const authMiddleware = require("../../middleware/auth");
    const resourceMiddleware = require("../../middleware/resource");

    const router = express.Router({
        mergeParams: true     //combine parent and router parameter, so that use parent para in router req
    });


    /**
     * Hard to be universal
     * We should consider whether we need a common interface
     */
    // const Category = require("../../models/Category");
    // router.post("/categories", async(req, res) => {
    //     const model = await Category.create(req.body);
    //     res.send(model);
    // });

    /**
     * Change to universal interface
     * 1.add dynamic router /:resource in "app.use("/admin/api/rest/:resource",router)"
     * 2.delete specific categories
     * 3.get model type
     * 4.set mergeParams to true
     * 5.install "inflection" to change name which gets from req.params.resource to model
     * for example: categories -> Category
     * 6.add middleware in "app.use("/admin/api/rest/:resource",async(req,res,next),router)"
     * 7.add model in req; (req.model = require("../");)
     * 8.Notes: deal special situation
     */
    //Create resource
    router.post("/", async(req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    });

    //Update resource
    router.put("/:id", async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });

    //Delete resource
    router.delete("/:id", async(req,res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        });
    });

    //Get resource list
    router.get("/", async(req,res) => {
        //deal special situation
        const queryOptions = {};
        console.log(req.Model);
        if(req.Model.modelName === "Category")
        {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions);
        res.send(items);
    });

    //Get resource detail
    router.get("/:id", async(req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    });


    /**
     * http://localhost:3000/admin/api/rest/:resource
     */
    app.use("/admin/api/rest/:resource", authMiddleware(), resourceMiddleware(), router);


    /**
     * http://localhost:3000/admin/api/upload
     */
    //Finally need to make file visible in "server/index.js"
    //the middleware of dealing file data
    const multer = require("multer");
    const upload = multer({dest: __dirname + "/../../uploads"});
    //Item just need post 
    //allow interface to receive upload file
    app.post("/admin/api/upload", authMiddleware(), upload.single("file"), async (req,res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    });


    /**
     * http://localhost:3000/admin/api/login
     */
    app.post("/admin/api/login", async (req, res) => {
        const { username, password } = req.body;

        //1. get user with 'username' in DB
        // const AdminUser = require("../../models/AdminUser");
        const user = await AdminUser.findOne({
            username: username
        }).select("+password");       // Same as AdminUser.findOne({username});  "+password" -> get password with user
        
        assert(user, 421, "用户不存在");
        // if(!user)
        // {
        //     return res.status(421).send({
        //         message: "用户不存在"
        //     });
        // }

        
        //2. verify the corresponding password
        const isValid = require("bcrypt").compareSync(password, user.password)
        assert(isValid, 421, "密码错误");


        //3. return token
        // const jwt = require("jsonwebtoken");
        const token = jwt.sign({ id: user._id }, app.get("secret"))
        res.send({token});
    });



    //Catch exception -> assert throw err exception
    app.use( async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
    });
};