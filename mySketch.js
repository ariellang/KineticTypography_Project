
let input;

// A sound file object
var song;
var analyzer;

//typo
let font, points

function preload() {
	font = loadFont("Bubblegum.otf")

	// Load a sound file
	song = loadSound('RiverFlowsInYou.mp3');



}

function setup() {

	createCanvas(1000, 1000);
	song.loop();
	noFill()
	stroke(255)
	strokeWeight(5)


	genType('design', width / 5);
	

	// create a new Amplitude analyzer
	analyzer = new p5.Amplitude();

	// Patch the input to an volume analyzer
	analyzer.setInput(song);

	//create input 
	input = createInput('');
	input.position(width / 8, height / 8);

	//Call repaint() when input is detected.
	input.input(repaint);

	//update text
	input.changed(updateText);
}
 //paint the input value
function repaint() {
	let genType = input.value();
	text(genType, 5, 50);
}

//update text
function updateText() {
	genType.html(input.value());
}

function draw() {
	background(0);

	//typo
	push();
	translate(width / 2, height / 2)


	strokeWeight(2);
	stroke(255);

	for (let i = 0; i < points.length; i++) {
		fill(random(i), random(i % 255), random(255));
		let p = points[i]
		let s = mouseY / 5 + sin(i * .30 + frameCount * .05) * 30
		

		ellipse(p.x, p.y, s)
		
		//sound
	}
	textSize(15);
	strokeWeight(3);
	stroke(255, 0, 0);
	fill(0);

	text("← volume →", width / 4, height / 3);

	text("↑ speed ↓", width / 4 - 150, height / 3);

	pop();

	//synthesis
	// Set the volume to a range between 0 and 1.0
	var volume = map(mouseX, 0, width, 0, 1);
	volume = constrain(volume, 0, 1);
	song.amp(volume);

	// Set the rate to a range between 0.1 and 4
	// Changing the rate alters the pitch
	var speed = map(mouseY, 0.1, height, 0, 2);
	speed = constrain(speed, 0.01, 4);
	song.rate(speed);

	// cirles for regulating

	//push();
	//translate(0,0);
	strokeWeight(2);
	stroke(255, 0, 0, 90);
	fill(80, 60, 60, 90);
	ellipse(mouseX, 10, 45, 45);

	strokeWeight(2);
	stroke(255, 0, 0, 90);
	fill(80, 60, 60, 90);
	ellipse(10, mouseY, 45, 45);
	//pop();




	// Get the average (root mean square) amplitude
	var rms = analyzer.getLevel();



}


function keyPressed() {
	genType(input.value(), width / 5);
}

function genType(txtString, txtSize) {
	// grab bounding box of text
	let bounds = font.textBounds(txtString, 0, 0, txtSize)

	// textToPoints(txt, x, y, size, options)
	points = font.textToPoints(txtString, -bounds.w / 2, bounds.h / 2, txtSize, {
		sampleFactor: .07,
		simplifyThreshold: 0


	})
}

function mousePressed() {
	if(song.isPlaying()) {
   // .isPlaying() returns a boolean
   song.stop();
   background(129, 152, 254);
	} else {
		song.play();
		background(0);
	}
}
