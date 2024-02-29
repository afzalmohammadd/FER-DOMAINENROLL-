const mongoose=require("mongoose")


const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true,
        lowercase: true
    },
    password:{
        type:String,
        required:true,
        trim: true
    }
},

{
    timestamps:true,
})



const  user = mongoose.model('user',UserSchema)

module.exports=user

