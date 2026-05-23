import {z} from "zod";

export const WATCH_STATUS = {
     SCHEDULED : "scheduled",
     LIVE : "live",
     FINISHED : "finished"
}

export const listMatchesQuerySchema = z.object({
    limit:z.coerce.number().int().positive().max(100).optional()
});

export const matchIdParamSchema = z.object({
  id : z.coerce.number().int().positive()  
});

const isoDateString = z.string().refine((val=> !isNaN(Date.parse(val))) , {error : "Invalid ISO date string"});

export const CreateMatchDtoSchema = z.object({
  sport : z.string().min(1),
  homeTeam : z.string().min(1),
  awayTeam:z.string().min(1),
  homeScore : z.coerce.number().int().min(0).nonnegative(),
  awayScore  : z.coerce.number().int().min(0).nonnegative(),
  startTime : isoDateString,
  endTime : isoDateString
});


export const createMatchSchema = z.object({
    sport : z.string().min(1),
    homeTeam:z.string().min(1),
    awayTeam : z.string().min(1),
    startTime : isoDateString,
    endTime : isoDateString,
    homeScore : z.coerce.number().int().min(0).nonnegative(),
    awayScore :  z.coerce.number().int().min(0).nonnegative()
         
}).superRefine((data ,ctx)=>{
   const startDate = new Date(data.startTime);
   const endTime = new Date(data.endTime);

   if(startDate>endTime){
     ctx.addIssue({
        message:"startdate is greater then endDate",
        code:"custom",
        path:["endTime"]
     });
   }
})



