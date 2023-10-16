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

function readFile()
{
	const [file] = document.querySelector("input[type=file]").files;
	const reader = new FileReader();

	reader.addEventListener("load",() => 
	{
		let STLtext = reader.result;
		let coord1, coord2, coord3, c1, c2, c3, end;
		
		var lines = STLtext.split('\n');
		while (lines.length>3)
		{
			if (lines[0].substr(0,7) == "vertex " && lines[1].substr(0,7) == "vertex " && lines[2].substr(0,7) == "vertex ")
			{
				coord1 = lines[0].indexOf(' ');
				coord2 = lines[0].indexOf(' ', coord1+1);
				coord3 = lines[0].indexOf(' ', coord2+1);
				end = lines[0].indexOf('\r', coord3+1);
				c1 = new vec3([parseFloat(lines[0].substring(coord1,coord2-1).trim()),parseFloat(lines[0].substring(coord2,coord3-1).trim()),parseFloat(lines[0].substring(coord3, end).trim())]);
				coord1 = lines[1].indexOf(' ');
				coord2 = lines[1].indexOf(' ', coord1+1);
				coord3 = lines[1].indexOf(' ', coord2+1);
				end = lines[1].indexOf('\r', coord3+1);
				c2 = new vec3([parseFloat(lines[1].substring(coord1,coord2-1).trim()),parseFloat(lines[1].substring(coord2,coord3-1).trim()),parseFloat(lines[1].substring(coord3, end).trim())]);
				coord1 = lines[2].indexOf(' ');
				coord2 = lines[2].indexOf(' ', coord1+1);
				coord3 = lines[2].indexOf(' ', coord2+1);
				end = lines[2].indexOf('\r', coord3+1);
				c3 = new vec3([parseFloat(lines[2].substring(coord1,coord2-1).trim()),parseFloat(lines[2].substring(coord2,coord3-1).trim()),parseFloat(lines[2].substring(coord3, end).trim())]);
				triangles.push(new triangle(c1, c2, c3));
				triangles[triangles.length-1].material = {r: 0, g: 0, b: 1};
				triangles[triangles.length-1].Draw(canvas1);
			}
			lines.splice(0,1);		
		}			
		console.log(triangles.length +" triangles loaded");
		STLloaded = true;
	},false,);

    if (file) {
	  reader.readAsText(file);
	}
}

function sleep(ms)
{ // Source (very good explained): https://www.sitepoint.com/delay-sleep-pause-wait/
  return new Promise(resolve => setTimeout(resolve, ms));
}