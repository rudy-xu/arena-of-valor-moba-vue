module.exports = app => {
    const express = require("express");
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
    router.post("/", async(req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    });

    router.put("/:id", async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });

    router.delete("/:id", async(req,res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body);
        res.send({
            success: true
        });
    });

    router.get("/", async(req,res) => {
        //deal special situation
        const queryOptions = {};
        console.log(req.Model);
        if(req.Model.modelName === "Category")
        {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10);
        res.send(items);
    });

    router.get("/:id", async(req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    });

    app.use("/admin/api/rest/:resource", async(req,res,next) => {
        const modelName = require("inflection").classify(req.params.resource);;
        // console.log(modelName);
        req.Model = require(`../../models/${modelName}`);
        next();
    }, router);

    //Finally need to make file visible in "server/index.js"
    //the middleware of dealing file data
    const multer = require("multer");
    const upload = multer({dest: __dirname + "/../../uploads"});
    //Item just need post 
    //allow interface to receive upload file
    app.post("/admin/api/upload", upload.single("file"), async (req,res) => {
        const file = req.file;
        file.url = `http://localhost:3000/uploads/${file.filename}`;
        res.send(file);
    });
};