var sketch = function(p) {
	var historyT;
	var historyH;
	var lastTime;
	var HISTORY_SIZE = 900; // ~30s at 30fps

	// Clignotement : 2 flash (300ms on, 300ms off) puis pause 1200ms = cycle 2400ms
	var blinkT = { timer: 0, wasIdeal: false };
	var blinkH = { timer: 0, wasIdeal: false };

	var displayT = document.getElementById("display-t");
	var displayH = document.getElementById("display-h");
	var speedT = document.getElementById("speed-t");
	var speedH = document.getElementById("speed-h");

	p.setup = function() {
		var container = document.getElementById("game-canvas");
		var w = container.offsetWidth;
		var h = container.offsetHeight;
		var canvas = p.createCanvas(w, h);
		canvas.parent(container);

		historyT = new History(HISTORY_SIZE);
		historyH = new History(HISTORY_SIZE);
		lastTime = p.millis();

		// Brancher les boutons
		document.getElementById("btn-t-plus").addEventListener("click", function() {
			Game.pressT(1);
		});
		document.getElementById("btn-t-minus").addEventListener("click", function() {
			Game.pressT(-1);
		});
		document.getElementById("btn-h-plus").addEventListener("click", function() {
			Game.pressH(1);
		});
		document.getElementById("btn-h-minus").addEventListener("click", function() {
			Game.pressH(-1);
		});
	};

	p.windowResized = function() {
		var container = document.getElementById("game-canvas");
		p.resizeCanvas(container.offsetWidth, container.offsetHeight);
	};

	function updateBlink(state, isIdeal, dt) {
		if (isIdeal) {
			if (!state.wasIdeal) {
				state.timer = 0;
			}
			state.timer += dt;
			// Cycle total : 2400ms (300 on, 300 off, 300 on, 300 off, 1200 pause)
			var t = state.timer % 2400;
			state.visible = (t < 300) || (t >= 600 && t < 900);
			state.wasIdeal = true;
		} else {
			state.wasIdeal = false;
			state.visible = false;
		}
		return state;
	}

	function drawCurve(data, minVal, maxVal, idealVal, color, blinkState, yOffset, graphHeight) {
		var len = data.length;
		if (len < 2) return;

		var graphWidth = p.width - 40;
		var xStart = 30;

		// Ligne idéale
		var idealY = yOffset + p.map(idealVal, minVal, maxVal, graphHeight, 0);
		p.stroke(color[0], color[1], color[2], 60);
		p.strokeWeight(1);
		p.drawingContext.setLineDash([4, 4]);
		p.line(xStart, idealY, xStart + graphWidth, idealY);
		p.drawingContext.setLineDash([]);

		// Courbe
		p.stroke(color[0], color[1], color[2]);
		p.strokeWeight(2);
		p.noFill();
		p.beginShape();
		for (var i = 0; i < len; i++) {
			var x = xStart + (i / (HISTORY_SIZE - 1)) * graphWidth;
			var y = yOffset + p.map(data[i], minVal, maxVal, graphHeight, 0);
			p.vertex(x, y);
		}
		p.endShape();

		// Point courant
		var lastVal = data[len - 1];
		var cx = xStart + ((len - 1) / (HISTORY_SIZE - 1)) * graphWidth;
		var cy = yOffset + p.map(lastVal, minVal, maxVal, graphHeight, 0);

		if (blinkState.visible) {
			p.fill(255, 255, 255);
			p.stroke(color[0], color[1], color[2]);
			p.strokeWeight(3);
			p.ellipse(cx, cy, 14, 14);
		} else {
			p.fill(color[0], color[1], color[2]);
			p.noStroke();
			p.ellipse(cx, cy, 8, 8);
		}
	}

	p.draw = function() {
		var now = p.millis();
		var dt = now - lastTime;
		lastTime = now;

		Game.update(dt);

		historyT.push(Game.displayT());
		historyH.push(Game.displayH());

		// Mise à jour affichage textuel
		displayT.textContent = Game.displayT() + " °C";
		displayH.textContent = Game.displayH() + " %";
		speedT.textContent = (Game.controlSpeedT > 0 ? "+" : "") + Game.controlSpeedT;
		speedH.textContent = (Game.controlSpeedH > 0 ? "+" : "") + Game.controlSpeedH;

		// Clignotement
		updateBlink(blinkT, Game.isIdealT(), dt);
		updateBlink(blinkH, Game.isIdealH(), dt);

		// Dessin
		p.background(245);

		var halfHeight = p.height / 2;
		var padding = 10;
		var graphHeight = halfHeight - padding * 2;

		// Courbe T (haut, rouge)
		drawCurve(
			historyT.getAll(),
			Game.MIN_T, Game.MAX_T, Game.IDEAL_T,
			[200, 60, 60],
			blinkT,
			padding,
			graphHeight
		);

		// Séparateur
		p.stroke(200);
		p.strokeWeight(1);
		p.line(0, halfHeight, p.width, halfHeight);

		// Courbe H (bas, bleu)
		drawCurve(
			historyH.getAll(),
			Game.MIN_H, Game.MAX_H, Game.IDEAL_H,
			[60, 100, 200],
			blinkH,
			halfHeight + padding,
			graphHeight
		);
	};
};

new p5(sketch, "game-canvas");
