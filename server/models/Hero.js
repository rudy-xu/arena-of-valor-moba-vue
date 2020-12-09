const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    profession: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Categotry'}],
    scores:{
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number }
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
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

module.exports = mongoose.model("Hero", schema);