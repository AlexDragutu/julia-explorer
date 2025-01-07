var gl;  
var fShader, vShader;
var fShaderString, vShaderString;
var shaderProgram;
var squareVertexPositionBuffer;
var zoom = 3.0;
var max_iter = 150;
var raza = 150;
var c = new Complex(-0.859, 0);
var offX = 0, offY = 0;
var JuliaType = 0;
var cur_sel = "#s_classic";
var hueOffset = 2.6;
var dragging = 0;
var zooming = 0;
var StartDragX = 0;
var StartDragY = 0;


function getShaderString(id) {
	var shaderScript = document.getElementById(id);
	if (!shaderScript) {
		return null;
	}

	var str = "";
	var k = shaderScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}

	return str;
}

function UpdateShaders() {	
	var vShaderString = getShaderString("shader-vs");
	var fShaderString = getShaderString("shader-fs");
	fShaderString = fShaderString.replace(/#iter#/gi, max_iter);
	
	var errlog = "";
		
	fShader = gl.createShader(gl.FRAGMENT_SHADER);
	vShader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(fShader, fShaderString);
	gl.compileShader(fShader);
	
	if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
		errlog += "Compile error (fragment) : " + gl.getShaderInfoLog(fShader);
	}
	
	gl.shaderSource(vShader, vShaderString);
	gl.compileShader(vShader);
	
	if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
		errlog += "Compile error (vertex) : " + gl.getShaderInfoLog(vShader);
	}
	
	shaderProgram = gl.createProgram();
	
	gl.attachShader(shaderProgram, vShader);
	gl.attachShader(shaderProgram, fShader);
	
	gl.deleteShader(fShader);
	gl.deleteShader(vShader);

	gl.linkProgram(shaderProgram);
	
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		errlog += "Link error: " + gl.getProgramInfoLog(shaderProgram);
	}
	
	if (errlog != "") alert(errlog);

	gl.useProgram(shaderProgram);
}

function SetU1f(name, val) {
	var loc = gl.getUniformLocation(shaderProgram, name);
	if (loc != -1)
	{
		gl.uniform1f(loc, val);
	}
}

function SetU2f(name, val1, val2) {
	var loc = gl.getUniformLocation(shaderProgram, name);
	if (loc != -1)
	{
		gl.uniform2f(loc, val1, val2);
	}
}

function webGLStart() {
	//Init GL context
	try {
		var canvas = $("#myCanvas")[0];
		gl = canvas.getContext('experimental-webgl');
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch(e) {}
	
	if (!gl) {
		alert("WebGL Unavailable!");
	} 
	
	//Init shaders();
	UpdateShaders();
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	
	//Init buffer();
	squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	vertices = [
		 1.0,  1.0,
		-1.0,  1.0,
		 1.0, -1.0,
		-1.0, -1.0,
	];
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	squareVertexPositionBuffer.itemSize = 2;
	squareVertexPositionBuffer.numItems = 4;

	//Clear the viewport
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);

	//Draw the scene
	drawJulia();
}

function drawJulia() {
	uiUpdate();	

	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	SetU2f("u_offset", offX, offY);
	SetU2f("u_size", zoom, zoom);
	SetU1f("u_raza", raza);
	SetU2f("u_param", c.x, c.y);
	SetU1f("u_jType", JuliaType);
	SetU1f("u_hueoff", hueOffset);

	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	gl.drawArrays(gl.TRIANGLE_STRIP, 0, squareVertexPositionBuffer.numItems);
}

function uiUpdate() { //actualizeaza interfata cu valorile noi
	$("#c_real").val(c.x);
	$("#c_imag").val(c.y);
	$("#iter").val(max_iter);
	$("#nav_cx").val(offX);
	$("#nav_cy").val(offY);
	$("#nav_zoom").val(Math.round(100.0 / (zoom / 2)) / 100.0);
	$("#div_cx").text(offX); 
	$("#div_cy").text(offY); 
	$("#div_zoom").text((Math.round(100.0 / (zoom / 2)) / 100.0) + "x"); 	
	$("#div_TLx").text(offX - 0.5 * zoom);
	$("#div_TLy").text(offY + 0.5 * zoom);
	$("#div_BRx").text(offX + 0.5 * zoom); 
	$("#div_BRy").text(offY - 0.5 * zoom);  
}

	
$(document).ready(function() {	
	webGLStart();	
		
	$("#classic")[0].checked = true;
	$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";	
	$("#tooltip").hide();
	$("#s_poly").hide();
	$("#s_exp").hide();
	$("#s_trig").hide();
	$("#s_other").hide();	
		
	$("#s_classic").change(function() {
		var sel = $("#s_classic")[0];
		var selection = Number(sel.options[sel.selectedIndex].value);
		if (selection == 1) {
			JuliaType = 0;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.859, 0);			
			drawJulia();
		}
		else if (selection == 2) {
			JuliaType = 0;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.4, 0.6);			
			drawJulia();
		}
		else if (selection == 3) {
			JuliaType = 0;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0, 1);			
			drawJulia();
		}
		else if (selection == 4) {
			JuliaType = 0;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.26, 0);			
			drawJulia();
		}
		else if (selection == 5) {
			JuliaType = 0;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.8, 0.186);			
			drawJulia();
		}		
		else if (selection == 6) {
			JuliaType = 0;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.1, 0.78);			
			drawJulia();
		}		
		else if (selection == 7) {
			JuliaType = 0;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0, 0.64);			
			drawJulia();
		}
	});
	
	$("#s_poly").change(function() {
		var sel = $("#s_poly")[0];
		var selection = Number(sel.options[sel.selectedIndex].value);
		if (selection == 1) {
			JuliaType = 1;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>3</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.4, 0);			
			drawJulia();
		}
		else if (selection == 2) {
			JuliaType = 2;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>4</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.6, 0.55);
			drawJulia();
		}
		else if (selection == 3) {
			JuliaType = 3;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = c * z<sub>n</sub> * (1 - z<sub>n</sub>)";
			zoom = 3; offX = 0.5; offY = 0; raza = 150;
			c = new Complex(1, 0.1);			
			drawJulia();
		}
		else if (selection == 4) {
			JuliaType = 9;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = (<span style="+"text-decoration:overline"+">z</span><sub>n</sub>)<sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.123, -0.225);			
			drawJulia();
		}
		else if (selection == 5) {
			JuliaType = 4;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>4</sup> - z<sub>n</sub> - c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.78, 0);			
			drawJulia();
		}
		else if (selection == 6) {
			JuliaType = 5;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>6</sup> - z<sub>n</sub><sup>2</sup> - c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.525, 0);			
			drawJulia();
		}
	});
		
	$("#s_trig").change(function() {
		var sel = $("#s_trig")[0];
		var selection = Number(sel.options[sel.selectedIndex].value);
		if (selection == 1) {
			JuliaType = 6;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = c * sin(z<sub>n</sub>)";
			zoom = 13; offX = 0; offY = 0; raza = 150000;
			c = new Complex(1, 0.3);			
			drawJulia();
		}
		else if (selection == 2) {
			JuliaType = 6;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = c * sin(z<sub>n</sub>)";
			zoom = 13; offX = 0; offY = 0; raza = 150000;
			c = new Complex(1, 0);			
			drawJulia();
		}
		else if (selection == 3) {
			JuliaType = 7;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = i * c * cos(z<sub>n</sub>)";
			zoom = 13; offX = 0; offY = 0; raza = 150000;
			c = new Complex(1, 0.3);			
			drawJulia();
		}		
	});
	
	$("#s_other").change(function() {
		var sel = $("#s_other")[0];
		var selection = Number(sel.options[sel.selectedIndex].value);
		if (selection == 1) {
			JuliaType = 8;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = <sup>z<sub>n</sub><sup>3</sup> + c</sup>&frasl;<sub>z<sub>n</sub><sup>3</sup> - c</sub>";
			zoom = 4; offX = 0; offY = 0; raza = 150;
			c = new Complex(-1, 0);			
			drawJulia();
		}
		else if (selection == 2) {
			JuliaType = 10;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = (|x| + |y|i)<sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.323, 0.125);
			
			drawJulia();
		}
		else if (selection == 3) {
			JuliaType = 11;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub> * &radic;<span style="+"text-decoration:overline;"+">&nbsp;z</span><sub>n</sub> + c";;
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.2, 0);
			
			drawJulia();
		}
	});
	
	$("#classic").change(function() {
		if (cur_sel != "#s_classic") {
			$(cur_sel)[0].options[0].selected = true;
			$(cur_sel).hide();			
			cur_sel = "#s_classic";
			$(cur_sel).show();
			
			JuliaType = 0;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.859, 0);
			drawJulia();
		}
	});
	
	$("#poly").change(function() {
		if (cur_sel != "#s_poly") {
			$(cur_sel)[0].options[0].selected = true;
			$(cur_sel).hide();
			cur_sel = "#s_poly";
			$(cur_sel).show();
			
			JuliaType = 1;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>3</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.4, 0);			
			drawJulia();
		}
	});
	
	$("#trig").change(function() {
		if (cur_sel != "#s_trig") {
			$(cur_sel)[0].options[0].selected = true;
			$(cur_sel).hide();
			cur_sel = "#s_trig";
			$(cur_sel).show();
			
			JuliaType = 6;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = c * sin(z<sub>n</sub>)";
			zoom = 13; offX = 0; offY = 0; raza = 150000;
			c = new Complex(1, 0.3);			
			drawJulia();
		}
	});
	
	$("#other").change(function() {
		if (cur_sel != "#s_other") {
			$(cur_sel)[0].options[0].selected = true;
			$(cur_sel).hide();
			cur_sel = "#s_other";
			$(cur_sel).show();
			
			JuliaType = 8;
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = <sup>z<sub>n</sub><sup>3</sup> + c</sup>&frasl;<sub>z<sub>n</sub><sup>3</sup> - c</sub>";
			zoom = 4; offX = 0; offY = 0; raza = 150;
			c = new Complex(-1, 0);			
			drawJulia();
		}
	});
	
	$("#update").click(function() {
		if (JuliaType == 3) {
			zoom = 3; offX = -0.5; offY = 0;
		}
		else if (JuliaType == 6 || JuliaType == 7) {
			zoom = 13; offX = 0; offY = 0;
		}
		else if (JuliaType == 8) {
			zoom = 4; offX = 0; offY = 0;
		}
		else {
			zoom = 3; offX = 0; offY = 0;
		}
		
		if (isNaN(Number($("#c_real").val())) || isNaN(Number($("#c_imag").val())) || isNaN(Number($("#iter").val())))  {
			alert("Introduceti numai numere.");			
		}
		else {
			c.x = Number($("#c_real").val());
			c.y = Number($("#c_imag").val());
			max_iter = Number($("#iter").val());
			UpdateShaders();
			drawJulia();
		}
	});
	
	$("#resetZoom").click(function() {
		if (JuliaType == 3) {
			zoom = 3; offX = -0.5; offY = 0;
		}
		else if (JuliaType == 6 || JuliaType == 7) {
			zoom = 13; offX = 0; offY = 0;
		}
		else if (JuliaType == 8) {
			zoom = 4; offX = 0; offY = 0;
		}
		else {
			zoom = 3; offX = 0; offY = 0;
		}		
		drawJulia();
	});
	
	$("#colors").click(function() {
		hueOffset += 0.2;
		drawJulia();
	});
			
	$("#myCanvas").mousedown(function(e) {
		StartDragX = e.pageX;
		StartDragY = e.pageY;
		zooming = 1;
	});
	
	$("#myCanvas").mousemove(function(e) {
		if (dragging) {
			offX -= (e.pageX - StartDragX) * zoom * (1.0 / gl.viewportWidth);
			offY += (e.pageY - StartDragY) * zoom * (1.0 / gl.viewportHeight);
			dragging = 2;
		}
		if (zooming) {
			zoom += 3 * (e.pageY - StartDragY) * zoom * (1.0 / gl.viewportHeight);
			zooming = 2;
		}

		StartDragX = e.pageX;
		StartDragY = e.pageY;
		drawJulia();
	});
	
	$("#myCanvas").mouseup(function(e) {		
		if (dragging == 2) dragging = 0;
		else if (dragging == 0) dragging = 1;
		if (zooming == 2) dragging = 0;
		zooming = 0;
	});
	
	$("#myCanvas").bind("contextmenu", function(e) {
		return false;
	});
	
	$("#myCanvas").mouseleave(function(e) {
		dragging = 0;
		zooming = 0;
	});
	
	$("#nav_go").click(function() {
		if (isNaN(Number($("#nav_cx").val())) || isNaN(Number($("#nav_cy").val())) || isNaN(Number($("#nav_zoom").val()))) {
			alert("Introduceti numai numere.");
			uiUpdate();
		}	
		else {
			offX = Number($("#nav_cx").val());
			offY = Number($("#nav_cy").val());
			if (Number($("#nav_zoom").val())) 
				zoom = 2 * 1.0 / Number($("#nav_zoom").val());
			else zoom = 2 * 1;			
			drawJulia();	
		}	
	});	
});	

function Complex(real, imaginary) {
    this.x = real;       
    this.y = imaginary;  
}