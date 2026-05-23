import express from 'express';
import matchRouter from './routes/matchs.route';


const app = express();
const PORT = 8000;

app.use(express.json());

app.get("/" , (req , res) =>{
     console.log("hello")
     res.json({ testing  : "OK"})
})




app.use('/matches' , matchRouter );


app.listen(PORT , (err)=>{
  console.log(err)
})
console.log("server listening at port 8000")