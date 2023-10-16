"use strict";
function fehlerbehandlung(fehler, datei, zeile)
{
    alert("Fehler: \n" + fehler + "\n\nDatei: \n" + datei + "\n\nZeile: \n" + zeile);
}

function testing()
{
    // to be used
}

function main() // entspricht ziemlich der main.cpp vom 06.09.2023
{
    document.write("<canvas id='canvas' style='position:absolute; width:600px; left:100px; height:800px; top:200px; border:0px;display:block;'>");
    document.write("Unfortunately, your browser does not support the 'canvas' element. Please try to enable it or use another browser.");
    document.write("</canvas>");
    let canvas = document.getElementById("canvas");
    let rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    let drawingContext = canvas.getContext("2d");
    drawingContext.scale(1,1);
    console.log("geometry (", rect.left, ", ", rect.bottom, ", ", canvas.width, ", ", canvas.height ,")");
}


