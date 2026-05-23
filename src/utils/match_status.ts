import { WATCH_STATUS } from "../validation/matches";

type statusType = "scheduled" | "live" | "finished"

export function getMatchStatus(start_time : Date , end_time :Date , now : Date = new Date()) : statusType{
   const start = new Date(start_time);
   const end = new Date(end_time);

   if(now < start){
    return "scheduled";
   }

   if (now >= end){
     return "finished";
   }
   return "live";
}

// export function syncMatchStatus(match , updateStream){
//   const nextStatus = getMatchStatus(match.start_time , match.end_time);

// }