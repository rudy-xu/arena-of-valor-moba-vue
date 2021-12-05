const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {type: String},
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'},
});

//subcategory
//foreign key (parent) reference Category(parent)
schema.virtual("children", {
    localField: "_id",
    foreignField: "parent",
    justOne: false,
    ref: "Category"
});

//subcategoty
//foreign key (categories) reference Article(categories)
schema.virtual("newsList", {
    localField: "_id",
    foreignField: "categories",
    justOne: false,
    ref: "Article"
});

module.exports = mongoose.model("Category", schema);