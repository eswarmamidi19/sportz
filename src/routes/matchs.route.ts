import { Router } from "express";
import { CreateMatchDtoSchema, createMatchSchema } from "../validation/matches";
import { log } from "node:console";
import { getMatchStatus } from "../utils/match_status";
import { db } from "../db/db";
import { matches } from "../db/schema";

const matchRouter = Router()

matchRouter.get('/' , async (req , res) => {  
   try {
      const results =  await db.select().from(matches) 
      return res.json({data : results});
   } catch(e)  {
     return res.json({error : e}) 
   }
});

matchRouter.post("/" ,  async (req,res)=> {
   try {
    const reqBody = CreateMatchDtoSchema.safeParse(req.body);
    console.log(process.env.DATABASE_URL)
    if(reqBody.success){ 
      console.log(reqBody + "in terminal ")
      
      const myStartDate  =  new Date(reqBody.data.startTime);
      const myEndDate = new Date(reqBody.data.endTime);
      const myStatus = getMatchStatus(myStartDate , myEndDate);
      const [event]  = await db.insert(matches).values({
         ...reqBody.data,
         startTime : myStartDate,
         endTime : myEndDate,
         status : myStatus
      }).returning()

      res.status(200).json(event)

 
   }

   log("hi ra")
    
   if(reqBody.error){
       return  res.json({
          error : reqBody.error
       });
   }

    
   }catch(e){
      log(e)  
   }
 
});

matchRouter.get("/:id" , (req,res) => {
   res.json({id :  req.params}); 
});





matchRouter.get('/m1' , (req , res) => {
   res.json({match : "hello from m1"});  
});



export default matchRouter;

