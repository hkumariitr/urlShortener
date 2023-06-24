const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookies = require("js-cookies");

//@desc Register a user
//@route POST /api/users/register
//access public

const registerUser = asyncHandler(async (req,res)=>{
    const{username,email,password} = req.body;
    console.log(req.body)
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.json({"error": "User Already Registered!!"})
        res.redirect("/register")
        throw new Error("User Already Registered!!");
    }

    //Hash Password
     
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password: ",hashedPassword);
    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
    console.log(`User Created ${user}`);
    if(user){
        res.status(201).json({_id:user.id, email :user.email});  
    } else{
        res.status(400);
        throw new Error ("User Data is not valid")
    }
    res.json({message:"Resgister the user"});
});

//@desc Login user
//@route POST /api/users/login
//access public

const loginUser = asyncHandler(async (req,res)=>{
    const {email,password}= req.body;
    if(!email || !password){
        res.status(400);
        res.json({"error":"All fields are mandatory"})
        throw new Error("All fields are mandatory");

    }
    const user = await User.findOne({email});
    //compare password with hashed password

    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id :user.id
            }},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn :"30m"}
        )
        console.log(accessToken)
        res.status(200).json({accessToken});
        const token = accessToken
        Cookies.set('token', token, { httpOnly: true });

        console.log("set token to cookies")
    } else{
        const error = "Invalid Credentials"
        res.status(401).json({error})
        throw new Error("email or password invalid");
    }

    res.json({message:"login user"});
    });

//@desc current user info
//@route POST /api/users/curernt
//access private

const currentUser = asyncHandler(async (req,res)=>{
     res.json(req.user);
    });

module.exports = {registerUser,loginUser,currentUser};