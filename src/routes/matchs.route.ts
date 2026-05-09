import { Router } from "express";

const matchRouter = Router()

matchRouter.get('/' , (req , res) => {
   res.json({match : "hello"});  
});

matchRouter.get('/m1' , (req , res) => {
   res.json({match : "hello from m1"});  
});

export default matchRouter;

