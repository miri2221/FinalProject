import mongoose from 'mongoose'
import userModel from '../Model/users.js'
//const ObjectId = mongoose.Types.ObjectId;
 

export const dataNewUser= (req)=>{
    const {name, email, phone, adderss, city, logo} =req.body;    
    return {
        name,
        email,
        phone,
        adderss,
        city,
        logo,
        dress: []
    };
}
export const createUser= async (userData)=>{
    let user=new userModel(userData);
    await user.save();
}