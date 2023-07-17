const express = require('express');
const {connection} = require("./db")
const {userRouter} = require("./routes/user.route");
const {postRouter} = require("./routes/post.route")
require('dotenv').config();


const app = express();
app.use(express.json());

app.use("/users",userRouter);
app.use("/posts",postRouter);


app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("connected to the db");
        console.log(`server running on port ${process.env.port}`)
    } catch(err){
       console.log(err)
       console.log("Something went wrong while runnig the server!")
    };
})