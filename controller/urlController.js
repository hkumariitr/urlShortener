const Url = require("../models/urlModel");
const asyncHandler = require("express-async-handler");


//@desc Create new shortUrl
//@route POST /url
//access public
const createShortUrl = asyncHandler(async (req,res)=>{
    console.log("The request body is: ",req.body);
    const {fullUrl,Note} = req.body;
    console.log(fullUrl);
    console.log(Note);
    if(!fullUrl){
        res.status(400);
        throw new Error("Provide fullUrl");
    }
    const shortUrl = await Url.create({
        full: fullUrl,
        note: Note,
        user_id: req.user.id
    })
    res.status(201).json(shortUrl);
    res.redirect("/url");
});

//@desc get all Urls
//@route GET /url
//access public
const getUrls = asyncHandler(async (req,res)=>{
    const shortUrls = await Url.find({user_id:req.user.id});
    const{q}= req.query;
    console.log(q);
    const keys = ["full","short","note"];
    console.log(shortUrls)
    // const search = (data)=>{
    //     return data.filter(
    //         (item)=>{
    //           item.note.toLowerCase().includes(q)
    //     });
    // };
    console.log(shortUrls.filter(url=> url.full.includes(q)));
    // console.log(search(shortUrls));
    if(!q){
        res.status(200).json(shortUrls);
    }else{
        res.status(200).json(shortUrls.filter(url=> url.full.includes(q) || url.short.includes(q) || url.note.includes(q)));
    }
    
    if(!shortUrls){
        res.status(404).json({"message":"No Urls Found"})
    }
});

const redirectUrl = asyncHandler(async(req,res)=>{
    const shortUrl = await Url.findOne({short:req.params.shortUrl});
    if(!shortUrl){
        res.status(404).json({"message":"Invalid Short URL"});
    }

    shortUrl.clicks++
    shortUrl.save();
    console.log(`Get request for ${shortUrl.short} redirected to ${shortUrl.full}`)
    
    res.status(200).send(shortUrl.full)
})

module.exports = {createShortUrl,getUrls,redirectUrl}