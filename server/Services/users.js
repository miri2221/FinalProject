import mongoose from 'mongoose'
import userModel from '../Model/users.js'
import jwt from 'jsonwebtoken';
//const ObjectId = mongoose.Types.ObjectId;
 

export const dataNewUser= (req)=>{
    const {name,password, email, phone, adderss, city, logo} =req.body;    
    return {
        name,
        password,
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
export const generateToken= (id,name, password, email)=>{
    const secretKey =process.env.SECRET_KET;
    const params={
        '_id': id,
        'name':name,
        'password': password,
        'email': email
    };
    const token=jwt.sign(params, secretKey);
    return token;
}