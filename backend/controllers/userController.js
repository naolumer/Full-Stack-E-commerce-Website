import userModel from "../models/userModule.js";
import validator from 'validator'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const createToken  = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async (req,res) => {

}

// Route for user register
const registerUser = async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        // checking user already exists or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,msg:"User already exists"})
        }
        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, msg:"Please enter a valid email"})
        }
        if (password.length<8) {
            return res.json({success:false, msg:"Please enter a strong password"})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })
        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({
            success:true,
            token
        }) ;

    } catch (error){
        console.log(error);
        res.json({success:false , message:error.message})
    };
}

// Route for admin  login

const adminLogin = async (req,res)=>{

}

export {loginUser,registerUser, adminLogin}