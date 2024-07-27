import express from 'express'
import userModel from '../Model/users.js'
import mongoose from 'mongoose'
import * as userServices from '../Services/users.js'
//const ObjectId = mongoose.Types.ObjectId;

const router=express();


//פונקציה המחזירה את כל המשתמשים במערכת
export const getAllUser=async (req,res)=>{
    try{
        const users=await userModel.find({});
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({ message: 'לא נמצאו משתמשים' });
    }
}

//פונקציה המכניסה משתמש חדש
export const newUser=async (req,res)=> {
    try{
        const userData=userServices.dataNewUser(req);  //פונקציה המחזירה את פרטי המשתמש החדש
        await userServices.createUser(userData);  //פונקציה היוצרת משתמש חדש
        res.status(200).json({message: 'נרשמת בהצלחה למערכת'});
        // login(req, res);  //קריאה לפונקצית התחברות למערכת עם המשתמש החדש
    } 
    catch(error){
        res.status(510).json({message: 'ההרשמה נכשלה, נסו שנית'});
    }
}
//byEmail
//byName
//login
//update

export const updateUser=async (req,res)=> {
    // try{
    //     const{ name, email, }
    //}
    // try{
    //     const userData=userServices.dataNewUser(req);  //פונקציה המחזירה את פרטי המשתמש החדש
    //     await userServices.createUser(userData);  //פונקציה היוצרת משתמש חדש
    //     res.status(200).json({message: 'נרשמת בהצלחה למערכת'});
    //    // login(req, res);  //קריאה לפונקצית התחברות למערכת עם המשתמש החדש
    // } 
    // catch(error){
    //     res.status(510).json({message: 'ההרשמה נכשלה, נסו שנית'});
    // }
}
export default router;


