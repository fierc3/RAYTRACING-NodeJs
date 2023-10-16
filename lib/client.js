"use strict";
import { WebSocket } from "ws";


function remote(address, callback)
{
    console.log ("Remote Canvas. Connecting...")

    const socket = new WebSocket(address)

    socket.addEventListener ("open", (event) => {
        console.log ("socket open, sending commands ...")
        socket['secureSend'] = function(cmd) { return socket.send(cmd+"\r\n")}; 
        socket['pixel'] = function ( x, y, z, r, g, b){
            socket.secureSend("p " + x + " " + y + " " + z + " " + r + " " + g + " " + b);
        }
        callback(socket);
        console.log ("done")
        socket.close();
    })

    socket.addEventListener ("message", (event) => {
        console.log ("Message from server ", event.data);
    })
}

export { remote}