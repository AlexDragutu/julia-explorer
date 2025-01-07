var context = false;
var imgd = false;
var pix = false;
var canvas_off;
var zoom = 3;
var max_iter = 150;
var raza = 150;
var c = new Complex(-0.859, 0);
var offX = 0, offY = 0;
var w, h;	
var paleta_culori = new Array(1024);
var JuliaType = "classic";
var cur_sel = "#s_classic";
var coloring = 0;
var permut = [];
var is_drawing = 0;
var counter, t;
	
$(document).ready(function() {	
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
			JuliaType = "classic";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.859, 0);			
			drawJulia();
		}
		else if (selection == 2) {
			JuliaType = "classic";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.4, 0.6);			
			drawJulia();
		}
		else if (selection == 3) {
			JuliaType = "classic";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0, 1);			
			drawJulia();
		}
		else if (selection == 4) {
			JuliaType = "classic";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.26, 0);			
			drawJulia();
		}
		else if (selection == 5) {
			JuliaType = "classic";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.8, 0.186);			
			drawJulia();
		}		
		else if (selection == 6) {
			JuliaType = "classic";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.1, 0.78);			
			drawJulia();
		}		
		else if (selection == 7) {
			JuliaType = "classic";
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
			JuliaType = "tri";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>3</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.4, 0);			
			drawJulia();
		}
		else if (selection == 2) {
			JuliaType = "quad";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>4</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.6, 0.55);
			drawJulia();
		}
		else if (selection == 3) {
			JuliaType = "poly";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = c * z<sub>n</sub> * (1 - z<sub>n</sub>)";
			zoom = 3; offX = -0.5; offY = 0; raza = 150;
			c = new Complex(1, 0.1);			
			drawJulia();
		}
		else if (selection == 4) {
			JuliaType = "conj";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = (<span style="+"text-decoration:overline"+">z</span><sub>n</sub>)<sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.123, -0.225);			
			drawJulia();
		}
		else if (selection == 5) {
			JuliaType = "poly4";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>4</sup> - z<sub>n</sub> - c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.78, 0);			
			drawJulia();
		}
		else if (selection == 6) {
			JuliaType = "poly6";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>6</sup> - z<sub>n</sub><sup>2</sup> - c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.525, 0);			
			drawJulia();
		}
	});
	
	$("#s_exp").change(function() {
		var sel = $("#s_exp")[0];
		var selection = Number(sel.options[sel.selectedIndex].value);
		if (selection == 1) {
			JuliaType = "exp2";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = c * e<sup>z<sub>n</sub></sup>";
			zoom = 4; offX = -1.5; offY = 0; raza = 150000; 
			c = new Complex(1, 0);			
			drawJulia();
		}
		else if (selection == 2) {
			JuliaType = "exp";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = c * e<sup>z<sub>n</sub></sup>";
			zoom = 4; offX = -3; offY = 0; raza = 150000; 
			c = new Complex(0.36, 0);			
			drawJulia();
		}
		else if (selection == 3) {
			JuliaType = "exp_star";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = c * e<sup>z<sub>n</sub><sup>3</sup></sup>";
			zoom = 6; offX = 0; offY = 0; raza = 150000; 
			c = new Complex(1, 0);			
			drawJulia();
		}
	});
	
	$("#s_trig").change(function() {
		var sel = $("#s_trig")[0];
		var selection = Number(sel.options[sel.selectedIndex].value);
		if (selection == 1) {
			JuliaType = "sin";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = c * sin(z<sub>n</sub>)";
			zoom = 13; offX = 0; offY = 0; raza = 150000;
			c = new Complex(1, 0.3);			
			drawJulia();
		}
		else if (selection == 2) {
			JuliaType = "sin";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = c * sin(z<sub>n</sub>)";
			zoom = 13; offX = 0; offY = 0; raza = 150000;
			c = new Complex(1, 0);			
			drawJulia();
		}
		else if (selection == 3) {
			JuliaType = "cos";
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
			JuliaType = "rat";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = <sup>z<sub>n</sub><sup>3</sup> + c</sup>&frasl;<sub>z<sub>n</sub><sup>3</sup> - c</sub>";
			zoom = 4; offX = 0; offY = 0; raza = 150;
			c = new Complex(-1, 0);			
			drawJulia();
		}
		else if (selection == 2) {
			JuliaType = "abs";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = (|x| + |y|i)<sup>2</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(-0.323, 0.125);
			
			drawJulia();
		}
		else if (selection == 3) {
			JuliaType = "tree";
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
			
			JuliaType = "classic";
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
			
			JuliaType = "tri";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = z<sub>n</sub><sup>3</sup> + c";
			zoom = 3; offX = 0; offY = 0; raza = 150;
			c = new Complex(0.4, 0);			
			drawJulia();
		}
	});
	
	$("#exp").change(function() {
		if (cur_sel != "#s_exp") {
			$(cur_sel)[0].options[0].selected = true;
			$(cur_sel).hide();
			cur_sel = "#s_exp";
			$(cur_sel).show();
			
			JuliaType = "exp2";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = c * e<sup>z<sub>n</sub></sup>";
			zoom = 4; offX = -1.5; offY = 0; raza = 150000; 
			c = new Complex(1, 0);			
			drawJulia();
		}
	});
	
	$("#trig").change(function() {
		if (cur_sel != "#s_trig") {
			$(cur_sel)[0].options[0].selected = true;
			$(cur_sel).hide();
			cur_sel = "#s_trig";
			$(cur_sel).show();
			
			JuliaType = "sin";
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
			
			JuliaType = "rat";
			$("#formula")[0].innerHTML="z<sub>n+1</sub> = <sup>z<sub>n</sub><sup>3</sup> + c</sup>&frasl;<sub>z<sub>n</sub><sup>3</sup> - c</sub>";
			zoom = 4; offX = 0; offY = 0; raza = 150;
			c = new Complex(-1, 0);			
			drawJulia();
		}
	});
	
	$("#update").click(function() {
		if (JuliaType == "exp") {
			zoom = 4; offX = -3; offY = 0;
		}
		else if (JuliaType == "exp2") {
			zoom = 4; offX = 0; offY = 0;
		}
		else if (JuliaType == "exp_star") {
			zoom = 6; offX = 0; offY = 0;
		}
		else if (JuliaType == "poly") {
			zoom = 3; offX = -0.5; offY = 0;
		}
		else if (JuliaType == "sin" || JuliaType == "cos") {
			zoom = 13; offX = 0; offY = 0;
		}
		else if (JuliaType == "rat") {
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
			drawJulia();
		}
	});
	
	$("#resetZoom").click(function() {
		if (JuliaType == "exp") {
			zoom = 4; offX = -3; offY = 0;
		}
		else if (JuliaType == "exp2") {
			zoom = 4; offX = 0; offY = 0;
		}
		else if (JuliaType == "exp_star") {
			zoom = 6; offX = 0; offY = 0;
		}
		else if (JuliaType == "poly") {
			zoom = 3; offX = -0.5; offY = 0;
		}
		else if (JuliaType == "sin" || JuliaType == "cos") {
			zoom = 13; offX = 0; offY = 0;
		}
		else if (JuliaType == "rat") {
			zoom = 4; offX = 0; offY = 0;
		}
		else {
			zoom = 3; offX = 0; offY = 0;
		}		
		drawJulia();
	});
	
	$("#colors").click(function() {
		coloring = (coloring + 1) % 6;
		drawJulia();
	});
	
	$("#myCanvas").bind("contextmenu", function(e) {
		return false;
	});
	
	$("#myCanvas").mousedown(function(e) {
		if (!is_drawing) {
			var x_on_canvas = e.pageX - canvas_off.left;
			var y_on_canvas = e.pageY - canvas_off.top;
			offX += ((w / 2 - x_on_canvas) / w) * zoom;
			offY += ((h / 2 - y_on_canvas) / h) * zoom;					
			switch(e.which) {
				case 1:
					zoom /= 2.0;
					break;
				case 3:
					zoom *= 2.0;					
					break;
			}					
			drawJulia();
		}
	});
	
	$("#myCanvas").mousemove(function(e) {
		if (!is_drawing) {
			var x_on_canvas = e.pageX - canvas_off.left;
			var y_on_canvas = e.pageY - canvas_off.top;
			
			var normalized_x = x_on_canvas / $("#myCanvas").attr("width");
			var normalized_y = y_on_canvas / $("#myCanvas").attr("width");
			
			var actual_x = (normalized_x - 0.5) * zoom - offX;
			var actual_y = -((normalized_y - 0.5) * zoom - offY);
			$("#tooltip").show();
			$("#tooltip").text(actual_x + " , " + actual_y);
			$("#tooltip").offset({top:e.pageY + 20, left:e.pageX});
		}		
	});
	
	$("#myCanvas").mouseleave(function(e) {
		if (!is_drawing) $("#tooltip").hide();
	});
	
	$("#myCanvas").mouseenter(function(e) {
		if (!is_drawing) $("#tooltip").show();
	});
	
	$("#nav_go").click(function() {
		if (isNaN(Number($("#nav_cx").val())) || isNaN(Number($("#nav_cy").val())) || isNaN(Number($("#nav_zoom").val()))) {
			alert("Introduceti numai numere.");
			uiUpdate();
		}	
		else {
			offX = -Number($("#nav_cx").val());
			offY = Number($("#nav_cy").val());
			if (Number($("#nav_zoom").val())) 
				zoom = 1.0 / Number($("#nav_zoom").val());
			else zoom = 3;			
			drawJulia();	
		}	
	});	
	
	permut = [0, 1, 2, 0, 2, 1, 1, 0, 2, 1, 2, 0, 2, 0, 1, 2, 1, 0];//folosit pentru schimbarea culorilor
	w = $("#myCanvas").width();
	h = $("#myCanvas").height();	
	context = $("#myCanvas")[0].getContext('2d'); //Contextul 2D este folosit pentru desenarea in Canvas
	if (!context || !context.putImageData) alert("Error loading canvas element.");			
	if (context.createImageData) imgd = context.createImageData(w, h); 
	else if (context.getImageData) imgd = context.getImageData(0, 0, w, h); 
	else imgd = {'width' : w, 'height' : h, 'data' : new Array(w * h * 4)};
	pix = imgd.data; //structura de tip array de dimensiune (w * h * 4) contine informatiile asociate pixelilor din Canvas		
	canvas_off = $("#myCanvas").offset();
		
	makeColors();	
	drawJulia();	
});	

function uiUpdate() { //actualizeaza interfata cu valorile noi
	$("#c_real").val(c.x);
	$("#c_imag").val(c.y);
	$("#iter").val(max_iter);
	$("#nav_cx").val(-offX);
	$("#nav_cy").val(offY);
	$("#nav_zoom").val(Math.round(100.0 / zoom) / 100.0);
	$("#div_cx").text(-offX); 
	$("#div_cy").text(offY); 
	$("#div_zoom").text((Math.round(100.0 / zoom) / 100.0) + "x"); 	
	$("#div_TLx").text(-offX - 0.5 * zoom);
	$("#div_TLy").text(offY + 0.5 * zoom);
	$("#div_BRx").text(-offX + 0.5 * zoom); 
	$("#div_BRy").text(offY - 0.5 * zoom);  
}

function formDisable (opt) { //argument boolean
	$(cur_sel)[0].disabled = opt;
	$("#classic")[0].disabled = opt;
	$("#poly")[0].disabled = opt;
	$("#exp")[0].disabled = opt;
	$("#trig")[0].disabled = opt;
	$("#other")[0].disabled = opt;
	$("#c_real")[0].disabled = opt;
	$("#c_imag")[0].disabled = opt;
	$("#iter")[0].disabled = opt;
	$("#update")[0].disabled = opt;
	$("#resetZoom")[0].disabled = opt;
	$("#colors")[0].disabled = opt;
	$("#nav_cx")[0].disabled = opt;
	$("#nav_cy")[0].disabled = opt;
	$("#nav_zoom")[0].disabled = opt;
	$("#nav_go")[0].disabled = opt;
}

function makeColors() { //creeaza paleta de culori necesara pentru desenarea fractalului
	for (var i = 0; i < 1024; i++) {
		rap = 56.123 + 2.0 * Math.PI * i / 1024;
		var r = Math.round(128 + 127 * Math.sin(rap));
		var g = Math.round(128 + 127 * Math.sin(2 * rap));
		var b = Math.round(128 + 127 * Math.cos(3 * rap)); 		
		var final_color = (r << 16) | (g << 8) | b;
		paleta_culori[i] = final_color;
	}		
}

function drawJulia() {
	if (!is_drawing) {
		uiUpdate();
		formDisable(true);
		$("#tooltip").show();
		$("#tooltip").text("0 %");
		$("#tooltip").offset({top:canvas_off.top + w - 30, left:canvas_off.left + h/2 - 25});
		is_drawing = 1;		
		counter = 0;
		t = setInterval("threadJulia(counter)", 0);		
	}
}

function threadJulia(contor) {
	for (var i = 4 * contor, n = pix.length; i < n; i += 4) {
		contor++;
		var it = 0; // Iteratia curenta
		var z = new Complex (((i/4 % w) / w - 0.5) * zoom - offX, -(((i/4 / h) / h - 0.5) * zoom - offY));
		var modul;
		do {
			it++;
			// Formulele folosite, depind de tipul selectat
			if (JuliaType == "classic") { //0
				z = Complex.add(Complex.pow(z, 2), c);
			}
			else if (JuliaType == "tri") { //1
				z = Complex.add(Complex.pow(z, 3), c);
			}
			else if (JuliaType == "quad") { //2
				z = Complex.add(Complex.pow(z, 4), c);
			}
			else if (JuliaType == "poly") { //3
				z = Complex.multiply(Complex.multiply(c, z), Complex.subtract(Complex.one, z));
			}
			else if (JuliaType == "poly4") { //4
				z = Complex.subtract(Complex.subtract(Complex.pow(z, 4), z), c);
			}
			else if (JuliaType == "poly6") { //5
				z = Complex.subtract(Complex.subtract(Complex.pow(z, 6), Complex.pow(z, 2)), c);
			}
			else if (JuliaType == "exp" || JuliaType == "exp2") { 
				z = Complex.multiply(c, Complex.exp(z));
			}
			else if (JuliaType == "exp_star") { 
				z = Complex.multiply(c, Complex.exp(Complex.pow(z, 3)));
			}
			else if (JuliaType == "sin") { //6
				z = Complex.multiply(c, Complex.sin(z));
			}
			else if (JuliaType == "cos") { //7
				z = Complex.multiply(Complex.multiply(c, Complex.i), Complex.cos(z));
			}
			else if (JuliaType == "rat") { //8
				z = Complex.divide(Complex.add(Complex.pow(z, 3), c), Complex.subtract(Complex.pow(z, 3), c));
			}
			else if (JuliaType == "conj") { //9
				z = Complex.add(Complex.pow(Complex.conj(z), 2), c);
			}
			else if (JuliaType == "abs") { //10
				z = Complex.add(Complex.pow(new Complex(Math.abs(z.x), Math.abs(z.y)), 2), c);
			}
			else if (JuliaType == "tree") { //11
				z = Complex.add(Complex.multiply(z, Complex.sqrt(z)), c);
			}			
			modul = z.x * z.x + z.y * z.y;			
		} 
		while ((it < max_iter) && (modul < raza));
		if (it < max_iter) {
			var index = ((it - ((Math.log(Math.log(modul))) / Math.log(2.0))) / max_iter) * 1023.0;
			var idx = Math.round((index * 2 + 1023) % 1023);
			var color_ = paleta_culori[idx];
			//In functie de tipul de colorare selectata, se coloreaza diferit
			var r = (color_ >> (8 * permut[2 + coloring * 3])) & 255;
			var g = (color_ >> (8 * permut[1 + coloring * 3])) & 255;
			var b = (color_ >> (8 * permut[0 + coloring * 3])) & 255;					
			pix[i]=r;
			pix[i+1]=g;
			pix[i+2]=b;
			pix[i+3]=255;
		}
		else {
			pix[i]=0; pix[i+1]=0; pix[i+2]=0;
			pix[i+3]=255;
		}
		if (!(contor % (16 *w))) break;
	}
	$("#tooltip").text(Math.round((contor * 100) / (w * h)) + " %");
	counter = contor;
	if (contor == w*h) {
		formDisable(false);
		$("#tooltip").hide();
		is_drawing = 0
		clearInterval(t);
		context.putImageData(imgd, 0, 0); 	
	}	
}