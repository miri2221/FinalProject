import mongoose from 'mongoose'
import dressModel from '../Model/dress.js'
// import jwt from 'jsonwebtoken';
//const ObjectId = mongoose.Types.ObjectId;


//פונקציה המחזירה את פרטי השמלה החדשה
export const dataNewDress= (req)=>{
    // const image=req.file.path; 
    const feedback=0;
    const businessID=req.body._id;
    const {color,image , size, price}=req.body;
    return{
        color,
        image, 
        size,
        price,
        feedback,
        businessID
    }
}

//פונקציה היוצרת ושומרת שמלה חדשה
export const createDress=async (dressData)=>{
    let dress=new dressModel(dressData);
    await dress.save();
}