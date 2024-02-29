const mongoose=require("mongoose")


const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    category:{
        type:String,
        
    },
    description:{
        type:String
    }
}) 



const  product = mongoose.model('product',productSchema)

module.exports=product

