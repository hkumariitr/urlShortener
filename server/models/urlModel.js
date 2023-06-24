const mongoose = require("mongoose");
const shortid = require("shortid");
const urlSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    full:{
        type:String,
        required: [true, "Please add URL to be shorten"]
    },
    short:{
        type:String,
        required: true,
        default:shortid.generate
    },
    note:{
        type:String,
        default:"No Note added"
    },
    clicks:{
        type:Number,
        required: true,
        default:0
    },
},{
    timestamps:true
})

module.exports = mongoose.model("Url",urlSchema);