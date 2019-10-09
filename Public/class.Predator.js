//---------------------Predator
class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 40;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 3;

            let predator = new Predator(x, y);
            predatorArr.push(predator);

            this.life = 40;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(2);
        let emptyCells1 = this.chooseCell(5);
        let newCell = random(emptyCells.concat(emptyCells1));

        if (newCell) {
            this.energy++;

            let x = newCell[0];
            let y = newCell[1];


            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;


            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            for (let i in goblinArr) {
                if (goblinArr[i].x == x && goblinArr[i].y == y) {
                    goblinArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;

            if (this.energy >= 9) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.energy--;
        let emptyCells = this.chooseCell(0);
        let emptyCells1 = this.chooseCell(1);
        let newCell = random(emptyCells.concat(emptyCells1));

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];


            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
        }
        if (this.energy < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in predatorArr) {
            if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                predatorArr.splice(i, 1)
            }
        }
    }
}