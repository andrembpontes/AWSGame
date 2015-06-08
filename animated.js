var notImplementedFunction = function(){console.log("not implemented")};

function getVal(src){
	if(typeof(src) == "function")
		return src.call(this)

	return src
}

Animated = function(ctx, drawable, xSrc, ySrc, updateInterval){
	this.ctx = ctx
	this.drawable = drawable
	this.xSrc = xSrc
	this.ySrc = ySrc
	this.updateInterval = updateInterval
	this.runnig = false

	this.showing = false
}
Animated.prototype.start = function(){
	var $this = this
	this.interval = setInterval(function() {
		$this.update.call($this)
	}, this.updateInterval);

	this.runnig = true
}
Animated.prototype.stop = function() {
	if(this.runnig){
		clearInterval(this.interval)
		this.runnig = false		
	}
}
Animated.prototype.update = function() {
	if(this.showing)
		this.hide()

	this.show()
}
Animated.prototype.hide = function(){
	this.drawable.clear(this.ctx, this.x, this.y)
	this.showing = false
}
Animated.prototype.show = function(){
	this.x = getVal(this.xSrc)
	this.y = getVal(this.ySrc)
	this.showing = true

	this.drawable.draw(this.ctx, this.x, this.y)
}
Animated.prototype.isShowing = function(){
	return this.showing || this.runnig
}
Animated.prototype.isRunning = function(){
	return this.runnig
}