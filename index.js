const express = require('express');
const {connection} = require("./db")
const {userRouter} = require("./routes/user.route");
const {postRouter} = require("./routes/post.route")

const app = express();
app.use(express.json());

app.use("/users",userRouter);
app.use("/posts",postRouter);


app.listen(7070, async()=>{
    try{
        await connection;
        console.log("connected to the db");
        console.log("server running on port 7070")
    } catch(err){
       console.log(err)
       console.log("Something went wrong while runnig the server!")
    };
})