import bcrypt from "bcryptjs";
import User from "../models/user.js";
import { json } from "express";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "all fields are required"
        })
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        return res.status(409).json({
            message: "Email already registered"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword
    })

    return res.status(201).json({
        message: "user registered succesfully",
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
}

export async function login(req, res){
    const {email, password} = req.body;

    const user = await User.findOne({email})
    
    if(!user){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }

    const comparedPassword = await bcrypt.compare(password,user.password);

    if(!comparedPassword){
        return res.status(401).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign(
        {userId:user.id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )
    res.json({
        message:"Login sucessfull",
        token
    })
}