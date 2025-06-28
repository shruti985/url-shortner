const mongoose=require("mongoose")
const UrlSchema=new mongoose.Schema({
    redirectURL:{
        type:String,
        required:true
    },
    shortId:{
        type:String,
        required:true,
        unique:true
    },
    visitHistory:[{
        timestamp:{type:Number}}],
        createdBy:{
            type:mongoose.Schema.ObjectId,
            ref:"users"
        }
},

{timestamps:true}
)
const URL=mongoose.model("url",UrlSchema)
module.exports=URL