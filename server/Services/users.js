import mongoose from 'mongoose'
import userModel from '../Model/users.js'
import jwt from 'jsonwebtoken';
//const ObjectId = mongoose.Types.ObjectId;
 

export const dataNewUser= (req)=>{
    const {name,password, email, phone, address, city, logo} =req.body;    
    return {
        name,
        password,
        email,
        phone,
        address,
        city,
        logo,
        // dress: []
    };
}
export const createUser= async (userData)=>{
    let user=new userModel(userData);
    await user.save();
    return user;
}
export const generateToken= (id,name, password, email, phone=null, address=null, city=null, logo=null)=>{
    const secretKey =process.env.SECRET_KET;
    const params={
        '_id': id,
        'name':name,
        'password': password,
        'email': email
    };
    if (phone) params.phone = phone;
    if (address) params.address = address;
    if (city) params.city = city;
    if (logo) params.logo = logo;
    const token=jwt.sign(params, secretKey);
    return token;
}
