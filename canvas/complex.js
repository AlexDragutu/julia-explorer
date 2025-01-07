function Complex(real, imaginary) {
    this.x = real;       
    this.y = imaginary;  
}

Complex.prototype.magnitude = function() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
};

Complex.prototype.negative = function() {
    return new Complex(-this.x, -this.y);
};

Complex.prototype.toString = function() {
    return "{" + this.x + "," + this.y + "}";
};

Complex.prototype.valueOf = function() { return this.x; }

Complex.add = function (a, b) {
    return new Complex(a.x + b.x, a.y + b.y);
};

Complex.subtract = function (a, b) {
    return new Complex(a.x - b.x, a.y - b.y);
};

Complex.multiply = function(a, b) {
    return new Complex(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
};

Complex.divide = function(a, b) {
	return new Complex((a.x * b.x + a.y * b.y)/(b.x * b.x + b.y * b.y), (a.y * b.x - a.x * b.y)/(b.x * b.x + b.y * b.y));
};

Complex.pow = function(z, p) {
	var r = Complex.one;
	for (var i = 0; i < p; i++) {
		r = Complex.multiply(r,z);
	}
	return r;
};

Complex.sqrt = function (z) {
	var Re, Im;
	Re = Math.sqrt((z.x + Math.sqrt(z.x * z.x + z.y * z.y)) / 2);
	if (Re != 0) Im = z.y / (2 * Re);
	else {
		Im = Math.sqrt((-z.x + Math.sqrt(z.x * z.x + z.y * z.y)) / 2);
		if (Im != 0) Re = Im / (2 * z.y);
	}
	return new Complex(Re, Im);
};

Complex.conj = function (z) {
	return new Complex(z.x, -z.y);
};

Complex.exp = function(z) {
	return new Complex(Math.exp(z.x) * Math.cos(z.y), Math.exp(z.x) * Math.sin(z.y));
}

Complex.sin = function(z) {
	return new Complex(0.5 * Math.sin(z.x) * (Math.exp(z.y) + Math.exp(-z.y)), 0.5 * Math.cos(z.x) * (Math.exp(z.y) - Math.exp(-z.y)));
}

Complex.cos = function(z) {
	return new Complex(0.5 * Math.cos(z.x) * (Math.exp(z.y) + Math.exp(-z.y)), 0.5 * Math.sin(z.x) * (Math.exp(z.y) - Math.exp(-z.y)));
}

Complex.zero = new Complex(0,0);
Complex.one = new Complex(1,0);
Complex.i = new Complex(0,1);