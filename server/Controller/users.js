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
        const user=await userServices.createUser(userData);  //פונקציה היוצרת משתמש חדש
        const loginResponse=await login(req);  //קריאה לפונקצית התחברות למערכת עם המשתמש החדש
        if(loginResponse.success){
            const {token, user}=loginResponse;
            res.status(200).json({message: 'נרשמת בהצלחה למערכת', token, user});
        }
        else{
            return res.status(401).json({message:'ההתחברות נכשלה'});
        }
    } 
    catch(error){
        console.log(error);
        res.status(500).json({message: 'ההרשמה נכשלה, נסו שנית'});
    }
}

//פונקציה המחזירה משתמש לפי סיסמא
export const getUserByPassword=async(password)=>{
    try{
        if(!password){
            return res.status(400).send({ message: 'לא הוקשה סיסמה' });
        }
        const user=await userModel.findOne({password:password})
            if(!user){
                return res.status(404).send({ message: 'לא נמצא משתמש התואם לסיסמה זו' });
            }
        return user;
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'החיפוש נכשל, נסו שנית'});
    }
}

//פונקציה המחזירה משתמש לפי שם
export const getUsersByName=async(name)=>{
    try{
        if(!name){
            throw new Error('לא הוקש שם');
        }
        const regexName= new RegExp(`^${name}`, 'i');
        const user=await userModel.find({name:regexName})
            if(user.length==0){
                throw new Error('לא נמצא משתמש התואם לשם זה');
            }
        return user;
    }
    catch(error){
        console.log(error);
        throw error;
        // res.status(500).json({message: 'החיפוש נכשל, נסו שנית'});
    }
}

//פונקציה לעדכון משתמש
export const updateUser=async(req,res)=>{
    try{
        const { name, password, email } = req.body;
        const user = { name, password, email };      
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
export const login=async(req)=>{
    try{
        const name=req.body.name;
        const password=req.body.password;
        const user=await getUsersByName(name);
        if(!user){
            return res.status(404).send({ message: 'לא קיים כזה משתמש, פנה להתחברות' });         
        }
        const currentUser=await getUserByPassword(password);
        if(!currentUser||currentUser.name!=name){
            return res.status(404).send({ message: 'שם משתמש או סיסמא שגויים, נסו שנית'});         
        }
        const token= userServices.generateToken(currentUser._id, name, password, currentUser.email);
        //res.user=currentUser;
        // return res.json({token, currentUser});
        return {success:true, token, user:currentUser};
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'ההתחברות נכשלה'});
    }
}



export default router;

