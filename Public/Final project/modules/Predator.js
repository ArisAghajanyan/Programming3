//---------------------Predator
var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Predator extends LiveForm {
    constructor(x, y) {
        super(x, y);
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
        return super.chooseCell(character);
    }
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
                predatorHashiv++;
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