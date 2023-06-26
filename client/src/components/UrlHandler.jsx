import React, {useEffect, useState} from "react";
import axios from "axios";
import "./UrlHandler.css";
import {useNavigate} from "react-router-dom"


const UrlHandler = ()=>{

    const navigate = useNavigate();

    const[query, setQuery] = useState("");
    //accessing shortURLs from backend
    const[shortUrls, setshortUrls] = useState([]);
    const token = localStorage.getItem('token');

    const fetchData = () => {
        
        
        if(!token){
            navigate.replace("/login")
            window.alert("User Autorisation failed!!");
        }
        axios.get(`/url?q=${query}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        .then((response) => {
            console.log(response);
            if(response.error){
                window.alert(response.error)
                console.log(response.error)
                navigate.replace("/login")
            }
            setshortUrls(response.data);
            console.log(shortUrls);
        })
        .catch((error) => console.log(error));
        
      }

      const handleShortUrl= (shortUrl)=>{
        console.log(`Short Url ${shortUrl} clicked`);
        axios.get(`/url/${shortUrl}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        .then((response) => {
            console.log("redirection for "+(response.data)+ " called");
            window.open(
                response.data
              );
            window.location.reload();
        })
        
        .catch((error) => console.log(error));

      }

      useEffect(() => {
        fetchData();
      }, [query])
      

    //Note functionality
    const[Note,setNote] = useState("");
    const handleNote = (e)=>{
        console.log(e);
        const value = e.target.value;
        console.log(value)
        setNote(value);
    }

    // full URL post code starts
    const[fullUrl,setfullUrl]= useState("");

    const handleUrl = (e)=>{
        console.log(e);
        const value = e.target.value;
        console.log(value)
        setfullUrl(value);
    }
    
    
    const handleSubmit = async(e) => {
        console.log("submit accessed")
        try{
            // const data = {fullUrl,Note}
            // console.log(JSON.stringify(data))
        e.preventDefault();
        const data = {fullUrl,Note}
        console.log(data);

        const res = await fetch("http://localhost:3001/url",{
            method:"POST",
            headers:{
                'Authorization': `Bearer ${token}`,
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
            
            window.alert("URL Shorten Successfully!")
            window.location.href = "/url"
        }
    } catch(err){
        console.log(err);
    }
    
}
    // full URL post code ends

    return(
        
        <div className="landing-container">
            <div className="navbar"> 
                <div className="head"> Shorten URLs</div>
             
            </div>
        

            <div className="input-container">
                <form action = "/url" className="input-form" method = "POST">
                <input required type = "url" name = "fullUrl" id = "fullUrl" placeholder=" Paste your URL here" className="fullUrl" value = {fullUrl} onChange={handleUrl}/>
                <div onClick={handleSubmit}> <button type="submit" className="inputbtn"> Short it</button> </div> 
                </form>
            </div>
                <div className="note-container">
                
                    <input type = "text" name = "note" id = "note" placeholder=" Add Note to your URL!" className="noteurl" value = {Note} onChange={handleNote}/>
                
                </div>
                
            
            <div className="search-container">
            <input type = "text" name = "query" placeholder=" Search here.." className="search" value = {query} onChange={(e)=>{ setQuery(e.target.value)}}/>
            </div>

            <div className="url-table-container">
                <table className="main-table"> 
                    <thead className="table-head">
                        <tr className="table-row">
                            <th className="row row-1">
                                Your URL
                            </th>
                            <th className="row row-2">
                                Shorten URL
                            </th>
                            <th className="row row-3">
                                Note
                            </th>
                            <th className="row row-4">
                                Clicks on URL
                            </th>
                        </tr>
                    </thead>
                    <tbdoy>
                        {shortUrls.map((shorturl)=>{
                        return(
                        <tr className="table-row">
                            <td className="row row-1" > <a href = {shorturl.full}> {shorturl.full}</a></td>
                            <td className="row row-2">  <p style={{cursor:"pointer", margin:"0"}} onClick = {()=>{handleShortUrl(shorturl.short)}}> {shorturl.short}</p></td>
                            <td className="row row-3">   {shorturl.note} </td>
                            <td className="row row-4">   {shorturl.clicks} </td>
                        </tr>
                        )
                    })}
                    </tbdoy>
                </table>
            </div>

        </div>
    );
}

export default UrlHandler;