const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async (req,res,next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        console.log("token recieveied in backend");
        console.log(token)
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
            if(err){
                res.status(401);
                console.log("user is not authorised")
                const error ="User is not authorised"
                res.json({error})
                throw new Error("User is not authorised");

            }
            req.user = decoded.user;
            next();
            if(!token){
                res.status(401);
                throw new Error("User is not authorized or token is missing");
            }
        })

    }
});

module.exports = validateToken;