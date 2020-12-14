const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    banner: { type: String },
    title: { type: String },
    profession: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
    scores:{
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number }
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        delay: {type: String },
        cost: {type: String },
        description: { type: String },
        tips: { type: String }
    }],
    itemGood: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    itemBad: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Item'}],
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero"},
        description: { type: String }
    }]
});

module.exports = mongoose.model("Hero", schema, "heroes");