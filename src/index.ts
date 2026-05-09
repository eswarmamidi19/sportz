import express from 'express';


const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/" , (req , res) =>{
     console.log("hello")
     res.json({ testing  : "OK"})
})


app.listen(PORT , (err)=>{
  console.log(err)
})
console.log("server listening at port 8000")