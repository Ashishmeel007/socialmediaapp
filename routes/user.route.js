const express = require('express');
const {UserModel} = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();


const userRouter = express.Router();

userRouter.post("/register", async(req,res)=>{
    const {name,email,gender,pass} = req.body;
    
    try{
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({msg:"User already exist"})
        }
        bcrypt.hash(pass,5, async(err,hash)=>{
            if(err){
                res.status(400).json({error:err.message});
            }else{
                const user =new UserModel({name,email,gender,pass:hash});
                await user.save();
                res.status(200).json({msg:"A new user has been registered!!",user:req.body});
            }
        });
    } catch(err){
       res.status(400).json({error:err.message});
    };
});


userRouter.post("/login", async(req,res)=>{
    const {email,pass} = req.body;
    try{
        const user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(pass,user.pass,(err,result)=>{
                if(result){
                    let token = jwt.sign({userID:user._id,user:user.name},process.env.secretKey);
                    res.status(200).json({msg:"Logged In!!",token});
                }else{
                    res.status(400).json({msg:"Wrong Credentials!"})
                }
            })
        }else{
            res.status(400).json({mag:"User does not exist!"})
        }
    }catch(err){
     res.status(400).json({error:err.messgae})
    };
});

module.exports ={
    userRouter
}