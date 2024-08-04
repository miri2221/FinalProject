import mongoose from 'mongoose'

const userSchema= new mongoose.Schema({
    name:{type:String,required:true},
    password:{type:String,required:true,unique:true},
    email:String,
    phone:String,
    address:String,
    city:String,
    logo:String,
    // dress: [String]
});
const userModel= mongoose.model("users", userSchema);
export default userModel;