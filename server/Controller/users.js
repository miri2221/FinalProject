import express from 'express'
import userModel from '../Model/users.js'
import mongoose from 'mongoose'
import { testToken } from '../MiddleWare/token.js';
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
        console.log(error);
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
        console.log(error);
        res.status(500).json({message: 'ההרשמה נכשלה, נסו שנית'});
    }
}

//פונקציה המחזירה משתמש לפי סיסמא
export const getUserByPassword=async(req,res)=>{
    try{
        const password=req.query.password;
        if(!password){
            return res.status(400).send({ message: 'לא הוקשה סיסמה' });
        }
        await userModel.findOne({password:password})
        .then(user=>{
            if(!user){
                return res.status(404).send({ message: 'לא נמצא משתמש התואם לסיסמה זו' });
            }
            res.send(user)
        })
    }
    catch(error){
        console.log(error);
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
        console.log(error);
        res.status(500).json({message: 'החיפוש נכשל, נסו שנית'});
    }
}

//פונקציה לעדכון משתמש
export const updateUser=async(req,res)=>{
    try{
        const { name, password, email } = req.body;
        const user = { name, password, email };
        
        console.log(req)
        const updaterUser=await userModel.findByIdAndUpdate(req.user._id,user,{new:true});
        if(!updaterUser){
            return res.status(404).send({ message: 'לא נמצא משתמש התואם לפרטים' });
        }
        const token=userServices.generateToken(req.user._id,user.name,user.password,user.email);
        return res.json({token:token,user:user});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'העידכון נכשל, נסו שנית'});
    }
}
router.use('/update', testToken, updateUser);

//פונקצית התחברות למערכת
export const login=async(req,res)=>{
    try{
        const name=req.body.name;
        const password=req.body.password;
        const user=await getUsersByName(name);
        if(!user){
            return res.status(404).send({ message: 'לא קיים כזה משתמש, פנה להתחברות' });         
        }
        const currentUser=await getUserByPassword(password)
        if(currentUser.name!=name){
            return res.status(404).send({ message: 'שם משתמש או סיסמא שגויים, נסו שנית'});         
        }
        const token= userServices.generateToken(currentUser._id, currentUser.name, password, email);
        res.user=currentUser;
        return res.json({token, user});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'ההתחברות נכשלה'});
    }
}



export default router;

