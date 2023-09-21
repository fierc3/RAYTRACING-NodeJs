"use strict";
import { WebSocket } from "ws";


function remote(address, callback)
{
    console.log ("Remote Canvas. Connecting...")

    const socket = new WebSocket(address)

    socket.addEventListener ("open", (event) => {
        console.log ("socket open, sending commands ...")
        callback(socket);
        console.log ("done")
        socket.close();
    })

    socket.addEventListener ("message", (event) => {
        console.log ("Message from server ", event.data);
    })
}

export { remote}