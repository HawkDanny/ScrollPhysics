

function Circle(x, y, radius, color) {
    this.body = Bodies.circle(x, y, radius);
    this.radius = radius;
    World.add(world, this.body);

    //Called every frame
    this.show = function() {
        fill(color);
        
        var pos = this.body.position;
        var angle = this.body.angle;

        push();
        translate(pos.x, pos.y);
        ellipse(0, 0, this.radius * 2);
        pop();
    }
}