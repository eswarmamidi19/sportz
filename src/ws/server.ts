import { WebSocket, WebSocketServer } from "ws";
import http from 'http';
import { matchType } from "../types";

type payloadType = {
      message_type : string,
      data ?: any 
}


function sendJson(ws : WebSocket , payload : payloadType){
     if(ws.readyState !== WebSocket.OPEN) return ; 
      ws.send(JSON.stringify(payload));
}


function brodcast( wss : WebSocketServer ,payload : payloadType) {
   for(const client of wss.clients){
       if (client.readyState !== WebSocket.OPEN ){
          return;
       }
     
       client.send(JSON.stringify(payload));

   }


}
function attachWebSocketServer(server : http.Server) {
     const webSocketServer = new WebSocketServer({
          server,
          path : "/ws",
          maxPayload : 1024 * 1024
     });
     webSocketServer.on('connection' , (socket) =>{
           sendJson(socket , {message_type : "welcome"});
           function brodcastMatchCreated(match : matchType){
               brodcast(webSocketServer ,{message_type : "match_created" , data : match} )
           }
           return {brodcastMatchCreated};
           
     })


}