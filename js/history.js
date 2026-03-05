function History(maxSize) {
	this.maxSize = maxSize;
	this.data = [];
}

History.prototype.push = function(value) {
	this.data.push(value);
	if (this.data.length > this.maxSize) {
		this.data.shift();
	}
};

History.prototype.getAll = function() {
	return this.data;
};
