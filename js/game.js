var Game = {
	T: 25,
	H: 25,
	controlSpeedT: 0,
	controlSpeedH: 0,

	IDEAL_T: 20,
	IDEAL_H: 42,

	MIN_T: 0,
	MAX_T: 40,
	MIN_H: 10,
	MAX_H: 90,

	MAX_CONTROL_SPEED: 5,

	// Accumulateurs pour le timing
	driftAccumulatorT: 0,
	driftAccumulatorH: 0,
	controlAccumulatorT: 0,
	controlAccumulatorH: 0,

	update: function(dt) {
		// Dérive naturelle : 1 unité par seconde, s'éloigne de l'idéal
		this.driftAccumulatorT += dt;
		while (this.driftAccumulatorT >= 1000) {
			this.driftAccumulatorT -= 1000;
			if (this.T > this.IDEAL_T) {
				this.T += 1;
			} else if (this.T < this.IDEAL_T) {
				this.T -= 1;
			}
		}

		this.driftAccumulatorH += dt;
		while (this.driftAccumulatorH >= 1000) {
			this.driftAccumulatorH -= 1000;
			if (this.H > this.IDEAL_H) {
				this.H += 1;
			} else if (this.H < this.IDEAL_H) {
				this.H -= 1;
			}
		}

		// Contrôle joueur : appliqué chaque seconde
		this.controlAccumulatorT += dt;
		while (this.controlAccumulatorT >= 1000) {
			this.controlAccumulatorT -= 1000;
			this.T += this.controlSpeedT;
		}

		this.controlAccumulatorH += dt;
		while (this.controlAccumulatorH >= 1000) {
			this.controlAccumulatorH -= 1000;
			this.H += this.controlSpeedH;
		}

		// Clamp aux bornes
		this.T = Math.max(this.MIN_T, Math.min(this.MAX_T, this.T));
		this.H = Math.max(this.MIN_H, Math.min(this.MAX_H, this.H));
	},

	pressT: function(dir) {
		this.controlSpeedT += dir;
		this.controlSpeedT = Math.max(-this.MAX_CONTROL_SPEED, Math.min(this.MAX_CONTROL_SPEED, this.controlSpeedT));
	},

	pressH: function(dir) {
		this.controlSpeedH += dir;
		this.controlSpeedH = Math.max(-this.MAX_CONTROL_SPEED, Math.min(this.MAX_CONTROL_SPEED, this.controlSpeedH));
	},

	isIdealT: function() {
		return this.T === this.IDEAL_T;
	},

	isIdealH: function() {
		return this.H === this.IDEAL_H;
	}
};
