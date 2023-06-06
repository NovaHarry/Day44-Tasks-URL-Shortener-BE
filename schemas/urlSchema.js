const mongoose = require('mongoose');
const shortId = require('shortid');


let urlSchema = new mongoose.Schema(
    {
        fullUrl:{type:String,required:true},
        shortUrl:{
            type:String,
            required:true,
            default: `${shortId.generate}.ly`
        },
        clicks:{type:Number,required:true,default: 0},
        createdAt:{type:Date,default:Date.now}
        },
    {
        versionKey:false
    }
)

let urlModel = mongoose.model('urls', urlSchema);
module.exports={urlModel};