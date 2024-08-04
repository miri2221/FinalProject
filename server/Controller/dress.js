import express from 'express'
import dressModel from '../Model/dress.js'
import mongoose from 'mongoose'
// import { testToken } from '../MiddleWare/token.js';
import * as dressServices from '../Services/dress.js'

const router=express();

//פונקציה המחזירה את כל השמלות השמורות במערכת
export const getAllDress= async (req, res)=>{
    try{
        const dress=await dressModel.find({});
        res.status(200).json(dress);
    }
    catch(error){
        console.log(error);
        res.status(404).json({message: 'לא נמצאו שמלות'});
    }
}

//הוספת שמלה חדשה
export const addNewDress=async (req,res)=>{
    try{
        const dressData=dressServices.dataNewDress(req);//פונקציה המחזירה את פרטי השמלה החדשה
        await dressServices.createDress(dressData);//פונקציה היוצרת ושומרת שמלה חדשה
        res.status(200).json({message: 'השמלה נוספה למערכת'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'הוספת השמלה נכשלה'});
    }
}

//פונקציה המסננת את השמלות לפי צבע מבוקש
export const getByColor=async (req, res)=>{
    try{
        const color=req.query.color;
        const dresses=await dressModel.find({color}).exec();
        if(dresses.length==0){
            return res.status(404).json({message:'לא נמצאה שמלה בצבע זה'});  
        }
        return res.status(200).json(dresses);
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'החיפוש נכשל, נסו שנית'});
    }
}

//פונקציה המסננת את השמלות לפי מידה מבוקשת
export const getBySize=async (req, res)=>{
    try{
        const size=req.query.size;
        const dresses=await dressModel.find({ size: { $in: [size] } }).exec();
        if(dresses.length==0){
            return res.status(404).json({message:'לא נמצאה שמלה במידה זו'});  
        }
        return res.status(200).json(dresses);
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'החיפוש נכשל, נסו שנית'});
    }
}

//פונקציה המסננת את השמלות לפי טווח מחירים
export const getByPrice=async (req, res)=>{
    try{
        const minPrice=parseFloat(req.query.minPrice);
        const maxPrice=parseFloat(req.query.maxPrice);
        const dresses= await dressModel.find({price: {$gte:minPrice, $lte: maxPrice}}).exec();
        if(dresses.length==0){
            return res.status(404).json({message:'לא נמצאו שמלות בטווח מחירים זה '});
        }
        return res.status(200).json(dresses);
    }
    catch (error){
        console.log(error);
        res.status(500).json({message:'החיפוש נכשל, נסו שנית'});
    }
}

export default router;