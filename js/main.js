//Aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite;

//Global engine reference
var engine;
var world;
var floor;

var objects = [];

//DOM element
var article;
var scrollPos;

function setup() {
    article = document.querySelector("article");
    scrollPos = 0;

    //Make a canvas that is half of the window, TODO: Make it resize
    var cnv = createCanvas(window.innerWidth / 2, window.innerHeight);
    cnv.parent("sketchHolder");

    //Create the physics engine
    engine = Engine.create();
    world = engine.world;

    createBounds();

    createHTMLEvents();

    //Start the simulation that runs at 60 frames per second
    Engine.run(engine);
}

//Called every frame
function draw() {
    background(51);
    noStroke();

    for (var i = 0; i < objects.length; i++) {
        objects[i].show();
    }

    if (scrollPos !== article.scrollTop) {

        translateCanvas(scrollPos - article.scrollTop);
        
        scrollPos = article.scrollTop;
    }
}

//Trio of functions to create colored circles
function createRed() {
    var pos = randomSpawn(30);

    objects.push(new Circle(pos.x, pos.y, 60, unhex(["A3", "14", "11"])));
}
function createGreen() {
    var pos = randomSpawn(30);

    objects.push(new Circle(pos.x, pos.y, 60, unhex(["0B", "4F", "1A"])));
}
function createBlue() {
    var pos = randomSpawn(30);

    objects.push(new Circle(pos.x, pos.y, 60, unhex(["1F", "3F", "96"])));
}

function boostUpward(force) {
    for (var i = 0; i < objects.length; i++) {
        objects[i].applyForce(floor.position, {x: 0, y: force});
    }
}

function translateCanvas(yTranslation) {
    
    //Prevent the objects from tunneling, by keeping yTranslation between -90 and 90
    yTranslation = Math.min(yTranslation, 75)
    yTranslation = Math.max(yTranslation, -75);

    if (yTranslation > 0) {
        boostUpward(yTranslation * -0.001);
    }

    Composite.translate(world, {x: 0, y: yTranslation});

    resetBorders();
}

//A function that returns a random spawn point in the top half of the canvas
function randomSpawn(buffer) {
    var randX = random(buffer, width - buffer);
    var randY = random(buffer, (height / 2) - buffer);

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
    World.remove(world, ceiling);

    createBounds();
}

function resetBorders() {

    World.remove(world, leftWall);
    World.remove(world, rightWall);
    World.remove(world, floor);
    World.remove(world, ceiling);

    createBounds();
}

//Create the floor and walls out of static rectangles
function createBounds() {
    //Floor
    floor = Bodies.rectangle(width / 2, height + 50, width, 100, {isStatic: true});

    //Ceiling
    ceiling = Bodies.rectangle(width / 2, -50, width, 100, {isStatic: true});

    //Walls
    leftWall = Bodies.rectangle(-10, height / 2, 20, height + 40, {isStatic: true});
    rightWall = Bodies.rectangle(width + 10, height / 2, 20, height + 40, {isStatic: true});

    World.add(world, [floor, ceiling, leftWall, rightWall]);
}

//Called at setup to link canvas events to html Elements
function createHTMLEvents() {
    document.querySelector("#red").addEventListener("mouseenter", createRed);
    document.querySelector("#green").addEventListener("mouseenter", createGreen);
    document.querySelector("#blue").addEventListener("mouseenter", createBlue);
    document.querySelector("#boost").addEventListener("click", function() { boostUpward(-0.1); } );
    document.querySelector("#translate").addEventListener("click", function() { translateCanvas(-100); } );
}