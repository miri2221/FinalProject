import express from 'express' 
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import mongodb from 'mongodb'
import users from './Routes/users.js'
import mongoose from './DB/users.js';

dotenv.config();
const port=process.env.PORT;
const app=express();

//fefe
app.use(cors());
// translate Json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//get
app.get("/",(req,res)=>{
    res.send("hello");
});
app.get("/n",(req,res)=>{
    res.send("nechami");
});
app.get("/m",(req,res)=>{
    res.send("miri");
});
app.use("/users",users);


app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
});
