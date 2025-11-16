import express from "express"
import db from "../config/db.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

dotenv.config()


export const Login = async (req,res)=>{
    const {userid,password}=req.body;


    const sql = "SELECT * FROM registered WHERE userid = ?";
    db.query(sql,[userid],(err,result)=>{
        if(err)
            return res.status(500).json({message:"Server Side Error"})
        if(result.length===0){
            return res.status(401).json({message:"User ID does not exists"});
        }

        const user =result[0];

        const isMatch = (password==user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect Password!!" });
        }

        const token = jwt.sign({name : user.name,userid:user.userid},process.env.JWT_SECRET,{expiresIn:'1d'})

        res.cookie('token',token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            })

        return res.status(200).json({
            status:"success",
            message:"Login Successfully",
            user:{name:user.name,userid:user.id}
        })

        
    })
}
export const Register = async (req, res) => {

  const { name, userid, password } = req.body;


  if(!name || !userid || !password){
    return res.status(400).json({message:"All Fields are Required"})
  }

  const checkSql = "SELECT * FROM registered WHERE userid = ?";

  db.query(checkSql, [userid], (err, result) => {
    if (err)
        return res.status(500).json({message:"Server Error"});
    if (result.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

  const insertSql = "INSERT INTO registered (name, userid, password) VALUES (?, ?, ?)";
  
    db.query(insertSql, [name, userid, password], (err) => {
      if (err) return res.status(500).json(err);
      return res.status(201).json({ message: "Registered Successfully" });
    });
  });
};