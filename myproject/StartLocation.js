class startLocation {

    constructor(topLeft,bottomRight) {
        new Coordinate(
            random(topLeft.x + 50, bottomRight.x - 50),
            random(topLeft.y + 50, bottomRight.y - 50)
        );
    }
}
