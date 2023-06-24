import React, { useState } from "react";
import "./Register.css"
import { useNavigate } from "react-router-dom";
const Register = ()=>{
    const navigate = useNavigate()
    const [username,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const RegisterUser = async(e) => {
            console.log("registration recieved")
            try{
            e.preventDefault();
            const data = {username,email,password}
            console.log(data);
    
            const res = await fetch("http://localhost:3001/users/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            });
        
            const response = await res.json();
            console.log(response);
            if(response.error){
                window.alert(response.error)
                console.log(response.error)
            }else{
                window.alert("You have been successfully registered")
                console.log("You have been successfully registered")
                navigate("/login");
                
            }
        } catch(err){
            console.log(err);
        }
        
}
    return(
        <>
     <section> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> 
        
        <div className="signup"> 
            <div className="content"> 
                <h2>Sign Up</h2> 
                
                <div className="form"> 
                    
                    <div className="inputBox"> 
                        <input value= {username} onChange = {(e)=>{setName(e.target.value)}} type="text" required /> <i>Username</i> 
                    </div> 
                    
                    <div className="inputBox"> 
                        <input value= {email} onChange = {(e)=>{setEmail(e.target.value)}} type="email" required /> <i>Email</i> 
                    </div> 
                    
                    <div className="inputBox"> 
                        <input value= {password} onChange = {(e)=>{setPassword(e.target.value)}} type="password" required /> <i>Password</i> 
                    </div> 
                    
                    <div className="links"> 
                        <a href="#"></a> <a href="#">Login</a> 
                    </div> 
                    
                    <div className="inputBox"> 
                       <button className="button" onClick={RegisterUser}> Register </button> 
                    </div> 
                    
                </div> 
            </div> 
        </div> 

  </section>
  </>
)
}

export default Register;