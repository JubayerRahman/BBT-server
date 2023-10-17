const express = require("express")
const cors  = require("cors")
const port = process.env.PORT || 3000
const app = express();

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Server of Assignment 10")
})

app.listen(port,()=>{
    console.log(`Server of assignment 10 is running at ${port}`);
})