const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
const cors = require('cors')
app.use(cors());

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/url",require("./routes/urlRoutes"))
app.use("/users", require("./routes/userRoutes"));

app.listen(port,()=>{
    console.log(`Server running on port ${port} `);
});