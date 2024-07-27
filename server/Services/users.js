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

   // try{
        //console.log(userData);
        //console.log(user);
        //user.email="256546342@jng.gh";
        //console.log(user);

    //}
    // catch (ex){
    //     console.log(ex); 
    // }
    //return user

    // console.log("8")
    // console.log(userData)
    // let user =  new userModel(userData);
    // try{
    // user.name ="dd";
    // user.email ="dd111@ddd.ddd";
    // await user.save();
    // }
    // catch (ex){
    //     console.log(ex);
    // }
    // return user
}

// export const saveUser= async (user) =>{
//     console.log(user);
//     await user.save();
//     console.log("5");

// }