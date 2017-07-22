//Aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

//Global engine reference
var engine;
var world;
var floor;

var objects = [];

function setup() {
    //Make a canvas that is half of the window, TODO: Make it resize
    var cnv = createCanvas(window.innerWidth / 2, window.innerHeight);
    cnv.parent("sketchHolder");

    //Create the physics engine
    engine = Engine.create();
    world = engine.world;

    createBounds();

    createHoverEffects();

    //Start the simulation that runs at 60 frames per second
    Engine.run(engine);
}

function mousePressed() {
    objects.push(new Circle(mouseX, mouseY, 20));
}

function draw() {
    background(51);
    noStroke();

    for (var i = 0; i < objects.length; i++) {
        objects[i].show();
    }
}

function createRed() {
    var pos = randomSpawn();

    objects.push(new Circle(pos.x, pos.y, 30, unhex(["A3", "14", "11"])));
}

function createGreen() {
    var pos = randomSpawn();

    objects.push(new Circle(pos.x, pos.y, 30, unhex(["0B", "4F", "1A"])));
}

function createBlue() {
    var pos = randomSpawn();

    objects.push(new Circle(pos.x, pos.y, 30, unhex(["1F", "3F", "96"])));
}

//A function that returns a random spawn point in the top half of the canvas
function randomSpawn() {
    var randX = random(20, width - 20);
    var randY = random(20, (height / 2) - 20);

    return {
        x: randX,
        y: randY
    }
}

//Resize the canvas and reset the boundaries on window resize
function windowResized() {
    resizeCanvas(window.innerWidth / 2, window.innerHeight);

    World.remove(world, leftWall);
    World.remove(world, rightWall);
    World.remove(world, floor);

    createBounds();
}

//Create the floor and walls out of static rectangles
function createBounds() {
    //Floor
    floor = Bodies.rectangle(width / 2, height + 10, width, 20, {isStatic: true});

    //Walls
    leftWall = Bodies.rectangle(-10, height / 2, 20, height + 40, {isStatic: true});
    rightWall = Bodies.rectangle(width + 10, height / 2, 20, height + 40, {isStatic: true});

    World.add(world, [floor, leftWall, rightWall]);
}

function createHoverEffects() {
    document.querySelector("#red").addEventListener("mouseenter", createRed);
    document.querySelector("#green").addEventListener("mouseenter", createGreen);
    document.querySelector("#blue").addEventListener("mouseenter", createBlue);
}