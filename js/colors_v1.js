function HexPair(hex, dist) {
	this.hex = hex;
	this.dist = dist;
}

function draw(img) {
    img.crossOrigin = '';
    var canvas = document.createElement("canvas");
    var c = canvas.getContext && canvas.getContext('2d');
    c.width = canvas.width = img.width;
    c.height = canvas.height = img.height;
    c.clearRect(0, 0, c.width, c.height);
    c.drawImage(img, 0, 0, img.width , img.height);
    return c; // returns the context
}

// returns a map counting the frequency of each color
// in the image on the canvas
function getColorMap(c) {
    var col, colors = {};
    var pixels, r, g, b, a;
    r = g = b, a = 0;
    pixels = c.getImageData(0, 0, c.width, c.height);
    var divisor = Math.min(pixels.data.length, 250);
    var increment = Math.ceil(pixels.data.length/divisor);
    for (var i = 0, data = pixels.data; i < data.length; i += (increment) ) {
        r = data[i];
        g = data[i + 1];
        b = data[i + 2];
        a = data[i + 3]; // alpha
        // skip pixels >50% transparent
        if (a < (255 / 2))
            continue; 
        col = rgbToHex(r, g, b);
	alert(col);
        if (!colors[col])
            colors[col] = 0;
        colors[col]++;
    }
    return colors;
}

function getMainColors(colors) {
	var distance = 30, i = 0;
	var mainColors = [];
	for (var hex in colors) {
		for (var hex2 in colors) {
			if (!mainColors[i])
				mainColors[i] = new HexPair(hex, 0);
			mainColors[i].dist += getDistance(hex,hex2)/1000;
		}
		i++;
		if (mainColors.length > 25)
			return mainColors;
	}

	return mainColors;
}


function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function getDistance(hex1, hex2) {
     var r1, g1, b1, r2, g2, b2;
     r1 = parseInt(hex1.substring(0,2),16);
     g1 = parseInt(hex1.substring(2,4),16);
     b1 = parseInt(hex1.substring(4,6),16);

     r2 = parseInt(hex2.substring(0,2),16);
     g2 = parseInt(hex2.substring(2,4),16);
     b2 = parseInt(hex2.substring(4,6),16);

     return Math.sqrt(Math.pow(r2 - r1,2) + Math.pow(g2-g1,2) + Math.pow(b2-b1,2));
}

function rotateHex (hex) {
     var r, g, b;
     r = parseInt(hex.substring(0,2),16);
     g = parseInt(hex.substring(2,4),16);
     b = parseInt(hex.substring(4,6),16);

     return rgbToHex(b,r,g);
}

// nicely formats hex values
function pad(hex) {
    return ("000000" + hex).slice(-6);
}

function sortByKey (map, ascending) {
	var keys = Object.keys(map);
	if (!ascending) {
		keys.sort(function(a, b){return b-a});
	} else {
		keys.sort(function(a, b){return a-b});
	}
}

function compare(a,b) {
	if (a.dist < b.dist)
		return -1;
 	if (a.dist > b.dist)
		return 1;
	return 0;
}

window.onload = init;

function init() {
	var info = document.getElementById("info");
	var img = document.getElementById("focus");
	var colors = getColorMap(draw(img));
	var mainColors = getMainColors(colors);
	var i = 0;
	mainColors.sort(compare);
	for (i = 0; i < mainColors.length; i++) {
	    info.innerHTML += "<li style='color:#" + mainColors[i].hex + "'>" + mainColors[i].hex + "->" + mainColors[i].dist;
	}
	
	document.getElementById("left").style.backgroundColor = mainColors[0].hex;
	document.getElementById("mid").style.backgroundColor =	rotateHex(mainColors[0].hex);
	document.getElementById("right").style.backgroundColor = rotateHex(rotateHex(mainColors[0].hex));
	//alert(mainColors[0].hex + " --- " + rotateHex(mainColors[0].hex));



}