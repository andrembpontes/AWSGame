
var canvas, ctx
var rect

function load(){
	console.log("loading")

	canvas = document.getElementById("canvasMain")
	ctx = canvas.getContext("2d")

	/*
	var myRectangle = {
		x: 0,
		y: 75,
		width: 100,
		height: 50,
		borderWidth: 5
	};
	
	//var startTime = (new Date()).getTime();
	//animate(myRectangle, canvas, ctx, startTime);
	
	drawRectangle(0, 0, 40, 40, "#8ED6FF", ctx);
	*/

	rect = new DrawableRect(10, 10, "#8ED6FF")
	//anim = new Animated(ctx, rect, function(){return rand(0, 630)}, function(){return rand(0, 420)}, 1000/600)
	//anim.start()

	ks = new KeySet("W", "S", "A", "D")
	cont = new KeyboardControlled(ctx, rect, 50 / 1000, 1000/60, ks);
	cont.start();

	ks = new KeySet("I", "K", "J", "L")
	cont = new KeyboardControlled(ctx, rect, 50 / 1000, 1000/60, ks);
	cont.start();

	//rect.draw(ctx, 0, 0)

}

function rand(min, max){
	return Math.random() * (max - min) + min
}

function drawRectangle(x, y, w, h, color, ctx) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.fillStyle = color;
	ctx.fill();
}

function animate(rect, canvas, ctx, startTime) {
    // update
    var time = (new Date()).getTime() - startTime;

    var linearSpeed = 100;
    // pixels / second
    var newX = linearSpeed * time / 1000;

    if(newX < canvas.width - rect.width - rect.borderWidth / 2) {
    	rect.x = newX;
    }

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRectangle(0, 0, 10, 10, "#8ED6FF", ctx);
}