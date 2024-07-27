import mongoose from 'mongoose'

const userSchema= new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    //index??
    phone:String,
    address:String,
    city:String,
    logo:String,
    dress: [String]
});
const userModel= mongoose.model("users", userSchema);
export default userModel;