const express=require("express");
const app=express();
//to read and manage cookies sent by the client
const cookieparser=require('cookie-parser');

require('dotenv').config();
const PORT=process.env.PORT || 4000;

app.use(express.json());
app.use(cookieparser());

require("./config/database").connect();

const user=require("./routes/user");
app.use("/api/v1",user);

app.listen(PORT,()=>{
    console.log("app is running on PORT:4000");
})