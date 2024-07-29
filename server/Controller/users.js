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
        res.status(404).json({ message: 'לא נמצאו משתמשים' });
    }
}

//פונקציה המכניסה משתמש חדש
export const addNewUser=async (req,res)=> {
    try{
        const userData=userServices.dataNewUser(req);  //פונקציה המחזירה את פרטי המשתמש החדש
        await userServices.createUser(userData);  //פונקציה היוצרת משתמש חדש
        res.status(200).json({message: 'נרשמת בהצלחה למערכת'});
        // login(req, res);  //קריאה לפונקצית התחברות למערכת עם המשתמש החדש
    } 
    catch(error){
        res.status(500).json({message: 'ההרשמה נכשלה, נסו שנית'});
    }
}

//פונקציה המחזירה משתמש לפי מייל
export const getUserByEmail=async(req,res)=>{
    try{
        const email=req.query.email;
        if(!email){
            return res.status(400).send({ message: 'לא הוקש מייל' });
        }
        await userModel.findOne({email:email})
        .then(user=>{
            if(!user){
                return res.status(404).send({ message: 'לא נמצא משתמש התואם למייל זה' });
            }
            res.send(user)
        })
    }
    catch(error){
        res.status(500).json({message: 'החיפוש נכשל, נסו שנית'});
    }
}

//פונקציה המחזירה משתמש לפי שם
export const getUsersByName=async(req,res)=>{
    try{
        const name=req.query.name;
        if(!name){
            return res.status(400).send({ message: 'לא הוקש שם' });
        }
        const regexName= new RegExp(`^${name}`, 'i');
        await userModel.find({name:regexName})
        .then(user=>{
            if(user.length==0){
                return res.status(404).send({ message: 'לא נמצא משתמש התואם לשם זה' });
            }
            res.json({user});
        })
    }
    catch(error){
        res.status(500).json({message: 'החיפוש נכשל, נסו שנית'});
    }
}


//login
//update


export default router;


