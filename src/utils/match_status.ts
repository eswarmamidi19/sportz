import { WATCH_STATUS } from "../validation/matches";


type status = typeof WATCH_STATUS

export function getMatchStatus(start_time : Date , end_time :Date , now : Date = new Date()){
   const start = new Date(start_time);
   const end = new Date(end_time);

   if(now < start){
    return WATCH_STATUS.SCHEDULED;
   }

   if (now >= end){
     return WATCH_STATUS.FINISHED;
   }
   return WATCH_STATUS.LIVE;
}

// export function syncMatchStatus(match , updateStream){
//   const nextStatus = getMatchStatus(match.start_time , match.end_time);

// }