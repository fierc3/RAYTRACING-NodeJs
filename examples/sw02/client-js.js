"use strict";
function remote()
{
    console.log ("Remote Canvas. Connecting...")

    const socket = new WebSocket("ws://10.147.112.59:9013")

    socket.addEventListener ("open", (event) => {
        console.log ("socket open, sending commands ...")
        doIt (socket)
        console.log ("done")
        socket.close();
    })

    socket.addEventListener ("message", (event) => {
        console.log ("Message from server ", event.data);
    })
}


function doIt (sock)
{
    let w = 600
    let h = 400

    sock.send ("s " + w + " " + h)
    sock.send ("f 0 0.4 0")

    let rr = [1, 1, 0, 0, 0, 1]
    let gg = [0, 1, 1, 1, 0, 0]
    let bb = [0, 0, 0, 1, 1, 1]

    // let nmax = 33;
    let nmax = 6;
    for (let n = 0; n < nmax; ++n)
    {
        let m = n % 6

        for (let y = 0; y < h; ++y)
        {
            let cmds = ""
            for (let x = 0; x < w; ++x)
            {
                let i = (x + y) % 256
                let c = i / 255.0
                let r = c * rr [m]
                let g = c * gg [m]
                let b = c * bb [m]

                cmd = "p " + x + " " + y + " " + r + " " + g + " " + b + "\r\n"
                // sock.send (cmd)
                cmds += cmd
            }
            sock.send (cmds)
        }
    }
}
