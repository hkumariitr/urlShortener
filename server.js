const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
const cors = require('cors')
const path = require("path")


app.use(cors());

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/url",require("./routes/urlRoutes"))
app.use("/users", require("./routes/userRoutes"));

app.use(express.static(path.join(__dirname, './client/build')))

app.get("*", function(req,res){
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
})
app.listen(port,()=>{
    console.log(`Server running on port ${port} `);
});