var notImplementedFunction = function(){console.log("not implemented")};

function getNow() {
	return (new Date()).getTime()
}

//interval: ms
//speed: px / ms
function calcPosition(x, y, dx, dy, interval, speed){
	var newX =  x + (dx * interval * speed)
	var newY =	y + (dy * interval * speed)

	return {x: newX, y: newY}
}

Controlled = function(ctx, drawable, speed, updateInterval){
	this.ctx = ctx
	this.drawable = drawable
	this.speed = speed
	
	var $this = this
	this.animated = new Animated(ctx, drawable, 
		function(){ return $this.getX() },
		function(){ return $this.getY() },
		updateInterval)

	this.running = false
}
Controlled.prototype.start = function(x, y, dx, dy){
	this.dx = dx || this.dx || 0
	this.dy = dy || this.dy || 0
	this.x = x || this.x || 0
	this.y = y || this.y || 0
	this.lastCalc = getNow()
	this.lastSetD = getNow()

	this.running = true

	this.animated.start()
}

Controlled.prototype.stop = function(){
	this.running = false
}

Controlled.prototype.getX = function(){ this.calcPosition(); return this.x }
Controlled.prototype.getY = function(){ this.calcPosition(); return this.y }
Controlled.prototype.setX = function(x) {this.calcPosition(); this.x = x}
Controlled.prototype.setY = function(y) {this.calcPosition(); this.y = y}

Controlled.prototype.calcPosition = function() {
	var mod = (getNow() - this.lastCalc ) * this.speed

	console.log(mod)

	this.x += this.dx * mod
	this.y += this.dy * mod

	this.lastCalc = getNow();
}

Controlled.prototype.getPos = function() { this.calcPosition(); return {x: this.x, y: this.y}}

Controlled.prototype.getDX = function() { return this.dx }
Controlled.prototype.getDY = function() { return this.dy }
Controlled.prototype.setDX = function(dx) { this.calcPosition(); this.dx = dx; this.lastSetD = getNow() }
Controlled.prototype.setDY = function(dy) { this.calcPosition(); this.dy = dy; this.lastSetD = getNow() }

Controlled.prototype.setD = function(d) {
	this.calcPosition()
	this.dx = d[0]
	this.dy = d[1]

	this.lastSetD = getNow();
}

Controlled.prototype.getSpeed = function() {return this.speed }
Controlled.prototype.setSpeed = function(speed) {this.calcPosition(); this.speed = speed}

Controlled.prototype.isRunning = function(){ return this.running }
Controlled.prototype.isShowing = function(){ return this.animated.isShowing() }

Controlled.prototype.hide = function(){ return this.animated.hide() }
Controlled.prototype.show = function(){ return this.animated.show() }

Controlled.prototype.getLastSetD = function(){ return this.lastSetD }

KeySet = function(up, down, left, right){
	this.up = up.toLowerCase()
	this.down = down.toLowerCase()
	this.left = left.toLowerCase()
	this.right = right.toLowerCase()
}

KeyboardControlled = function(ctx, drawable, speed, updateInterval, keyset){
	Controlled.call(this, ctx, drawable, speed, updateInterval)

	this.keyset = keyset

	var $this = this
	addEventListener("keydown", function(){ $this.keyDownEvent.apply($this, arguments) }, false);
	addEventListener("keyup", function() { $this.keyUpEvent.apply($this, arguments) }, false);	
}
KeyboardControlled.prototype = new Controlled()
KeyboardControlled.prototype.keyDownEvent = function(key){
	if(this.running){
		var k = key.key.toLowerCase()

		if( k == this.keyset.up) 
			this.setD([0, 1])

		if( k == this.keyset.down) 
			this.setD([0, -1])

		if( k == this.keyset.left) 
			this.setD([-1, 0])

		if( k == this.keyset.right) 
			this.setD([1, 0])
	}
}
KeyboardControlled.prototype.keyUpEvent = function(key){
}