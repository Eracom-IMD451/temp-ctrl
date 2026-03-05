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

	// Coefficient de dérive proportionnelle à la distance
	DRIFT_RATE: 0.05,

	update: function(dt) {
		var seconds = dt / 1000;

		// Dérive naturelle : proportionnelle à la distance de l'idéal
		var distT = this.T - this.IDEAL_T;
		this.T += distT * this.DRIFT_RATE * seconds;

		var distH = this.H - this.IDEAL_H;
		this.H += distH * this.DRIFT_RATE * seconds;

		// Contrôle joueur : continu
		this.T += this.controlSpeedT * seconds;
		this.H += this.controlSpeedH * seconds;

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

	displayT: function() {
		return Math.round(this.T);
	},

	displayH: function() {
		return Math.round(this.H);
	},

	isIdealT: function() {
		return this.displayT() === this.IDEAL_T;
	},

	isIdealH: function() {
		return this.displayH() === this.IDEAL_H;
	}
};
