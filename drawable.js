var notImplementedFunction = function(){console.log("not implemented")};

var Drawable = function(){}
Drawable.prototype.draw = notImplementedFunction
Drawable.prototype.clear = notImplementedFunction

var DrawableRect = function(width, height, color){
	this.width = width
	this.height = height
	this.color = color
}
DrawableRect.prototype = new Drawable()
DrawableRect.prototype.draw = function(ctx, x, y){
	ctx.beginPath();
	ctx.rect(x, -y, this.width, this.height);
	ctx.fillStyle = this.color;
	ctx.fill();
}
DrawableRect.prototype.clear = function(ctx, x, y){
	//TODO improve
	ctx.clearRect(x - 1, -y - 1, this.width + 2, this.height + 2)
}