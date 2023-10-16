import {remote} from './lib/client.js'
// import {vec2} from './lib/RayTracingClasses.js' example how helper methods can be loaded

// setups up the web sockets to communicate with the canvas server
// first parameter is the socket address
// second parameter is the callback function that should be executed once the connection has been established
remote("ws://127.0.0.1:9013", paintImage); 

function paintImage(sock)
{
    let w = 600
    let h = 400

    sock.send ("s " + w + " " + h)
    sock.send ("f 0 0.4 0")

    for (let x = 0; x < w; ++x)
    {
        let cmd = ""
        for (let y = 0; y < h; ++y)
        {
            let i = (x + y) % 256
            let c = i / 255.0

            cmd += "p " + x + " " + y + " " + c + " " + c + " 0\r\n"
        }
        sock.send (cmd)
    }
}

