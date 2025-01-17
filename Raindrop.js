class Raindrop {
    constructor() {
        this.x = random(water.x, farm.x+farm.width);
        this.y = random(-500, -50);
        this.z = random(0, 20);
        this.len = map(this.z, 0, 20, 10, 20);
        this.yspeed = map(this.z, 0, 20, 10, 20);
    }

    fall() {
        this.y = this.y + this.yspeed;

        let grav = map(this.z, 0, 20, 0, 0.5);
        this.yspeed = this.yspeed + grav;
        if (this.y > height) {
            this.y = random(-200, -100);
            this.yspeed = map(this.z, 0, 20, 4, 10);
        }

    }

    show() {
        let thick = map(this.z, 0, 20, 1, 3);
        strokeWeight(thick);
        stroke(38, 43, 226);

        line(this.x, this.y, this.x, this.y + this.len);

    }
}