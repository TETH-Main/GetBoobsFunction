/*
 *made by @TETH_Main
 *
 *
 * Latest v1.1 https://www.desmos.com/calculator/bcqxvcojpt
 *
 */

if (window.location.href.includes("desmos.com/calculator")) {
	if (typeof Calc != "undefined") {
		var GetBoobsFunc = {};

		GetBoobsFunc.rgb = function(H, S, V) {
			// https://qiita.com/akebi_mh/items/3377666c26071a4284ee
			// https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSV

			var C = V * S;
			var Hp = H / 60;
			var X = C * (1 - Math.abs(Hp % 2 - 1));

			var R, G, B;
			if (0 <= Hp && Hp < 1) {[R,G,B]=[C,X,0]};
			if (1 <= Hp && Hp < 2) {[R,G,B]=[X,C,0]};
			if (2 <= Hp && Hp < 3) {[R,G,B]=[0,C,X]};
			if (3 <= Hp && Hp < 4) {[R,G,B]=[0,X,C]};
			if (4 <= Hp && Hp < 5) {[R,G,B]=[X,0,C]};
			if (5 <= Hp && Hp < 6) {[R,G,B]=[C,0,X]};

			var m = V - C;
			[R, G, B] = [R+m, G+m, B+m];

			R = Math.floor(R * 255);
			G = Math.floor(G * 255);
			B = Math.floor(B * 255);

			return [R ,G, B];
		}

		GetBoobsFunc.hex = function (c) {
			if (c < 16) {
				return "0" + c.toString(16);
			} else {
				return c.toString(16);
			}
		}

		GetBoobsFunc.set = function() {

			var id = GetBoobsFunc.getId("l_{ock}");
			var itemID = GetBoobsFunc.getId("i_{tem}");
			var opID = GetBoobsFunc.getId("o_{pn}");

			var lock = Calc.expressionAnalysis[id];
			var item = Calc.expressionAnalysis[itemID];
			var op = Calc.expressionAnalysis[opID];

			var values = lock.evaluation.value;
			var valuesItem = item.evaluation.value;
			var valueOption = op.evaluation.value;

			var vars = GetBoobsFunc.getExpression(id).latex.split("[")[1].split("\\right]")[0].split(",");
			var expr = GetBoobsFunc.getExpression(GetBoobsFunc.getId("r=2^{1023}"));

			// common term
			if (valueOption == 6) { // drooping form
				expr.latex = 'r=-\\frac{1}{\\left(\\theta-\\frac{\\pi}{2}\\right)\\left(\\theta+\\frac{\\pi}{2}\\right)}+.4+l_{0}\\exp\\left(-3\\left(\\theta-l_{1}\\right)^{2}\\right)';
			} else {
				expr.latex = 'r=-\\frac{1}{\\left(\\theta-\\frac{\\pi}{2}\\right)\\left(\\theta+\\frac{\\pi}{2}\\right)}+.4+l_{0}\\exp\\left(-3\\left(\\theta-l_{1}\\right)^{2}\\right)+l_{2}\\exp\\left(-\\left(\\theta+l_{3}\\right)^{2}\\right)';
			}
			if (values[4] != 0) { // nipple
				expr.latex += '+l_{4}\\exp\\left(-\\left(l_{5}\\left(\\theta+l_{6}\\right)\\right)^{4}\\right)';
			}
			if (values[7] != 0) { // areola
				expr.latex += '+l_{7}\\exp\\left(-\\left(l_{8}\\left(\\theta+l_{6}\\right)\\right)^{6}\\right)';
			}
			switch (valueOption) { // option
				case 1:
					break;
				case 2:
					expr.latex += '+l_{9}\\frac{6\\left(\\theta+l_{10}\\right)+1}{\\left(\\theta+l_{10}\\right)^{2}+\\left(\\theta+l_{10}\\right)+1}';
					break;
				case 3:
					expr.latex += '+l_{9}\\left\\{\\theta+l_{10}<0:\\exp\\left(-.75\\left(\\theta+l_{10}\\right)^{2}\\right),\\exp\\left(-5\\left(\\theta+l_{10}\\right)\\right)\\right\\}';
					break;
				case 4:
					expr.latex += '+l_{9}\\frac{3\\left(\\theta+l_{10}\\right)+1}{\\left(\\theta+l_{10}\\right)^{2}+\\left(\\theta+l_{10}\\right)+3}';
					break;
				case 5:
					expr.latex += '+l_{9}\\exp\\left(-10\\theta^{2}\\right)';
					break;
				case 6:
					expr.latex += '+l_{9}\\left(2\\exp\\left(-\\left(\\theta+l_{10}\\right)^{2}\\right)-3\\exp\\left(-10\\left(\\theta+l_{10}+.44\\right)^{2}\\right)\\right)';
					break;
				default:
					expr.latex = '0';
			}

			var currentLatex = expr.latex;
			for (var i = 0; i < vars.length; i++) {
				currentLatex = currentLatex.split(vars[i]).join(values[i]);
			}

			expr.latex = currentLatex;
			expr.lineWidth = valuesItem[0];
			expr.lineOpacity = valuesItem[1];

			var Rgb = GetBoobsFunc.rgb(valuesItem[2], valuesItem[3], valuesItem[4]);

			var hexRed = GetBoobsFunc.hex(Rgb[0]);
			var hexBlue = GetBoobsFunc.hex(Rgb[1]);
			var hexGreen = GetBoobsFunc.hex(Rgb[2]);

			expr.color = "#" + hexRed + hexBlue + hexGreen;

			expr.id = "desmos" + (new Date()).getTime();
			Calc.setExpression(expr);
		}

		GetBoobsFunc.getExpression = function(id) {
			var expressions = Calc.getState().expressions.list;
			for (var i = 0; i < expressions.length; i++) {
				if (expressions[i].id === id) return expressions[i]; 
			}
		}
		GetBoobsFunc.getId = function(e) {
			var expressions = Calc.getState().expressions.list;
			for (var i = 0; i < expressions.length; i++) {
				if (expressions[i].latex) if (expressions[i].latex.startsWith(e)) return expressions[i].id;
			}
		}
		GetBoobsFunc.handler = function(e) {
			if (e.altKey && ((e.code == "KeyO") || (e.key == "o"))) {
				GetBoobsFunc.set();
			}
		}
		document.addEventListener('keyup', GetBoobsFunc.handler);
	} else {
		window.alert("uh oh, something went wrong")
	}
} else {
	window.alert("this only works on desmos.com/calculator :v")
}
