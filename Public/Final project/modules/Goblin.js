var LiveForm = require("./LiveForm");
var random = require("./random");


module.exports = class Goblin extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 40;
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

            let x = newCell[0];
            let y = newCell[1];
            goblinHashiv++;
            matrix[y][x] = 5;

            let goblin = new Goblin(x, y);
            goblinArr.push(goblin);

            this.life = 40;
        }
    }
    kill() {
        let emptyCells = this.chooseCell(2);
        let emptyCells1 = this.chooseCell(4);
        let emptyCells2 = this.chooseCell(3);
        let emptyCells3 = this.chooseCell(1);
        let newCell = random(emptyCells.concat(emptyCells1.concat(emptyCells2.concat(emptyCells3))));

        if (newCell) {
            this.life++;

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;


            for (let i in grassEaterArr) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }
            for (let i in hunterArr) {
                if (hunterArr[i].x == x && hunterArr[i].y == y) {
                    hunterArr.splice(i, 1)
                }
            }
            for (let i in predatorArr) {
                if (predatorArr[i].x == x && predatorArr[i].y == y) {
                    predatorArr.splice(i, 1)
                }
            }
            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;

            if (this.life >= 3) {
                this.mul();
            }
        } else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let emptyCells1 = this.chooseCell(1);
        let newCell = random(emptyCells.concat(emptyCells1));

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let i in grassArr) {
                if (grassArr[i].x == x && grassArr[i].y == y) {
                    grassArr.splice(i, 1)
                }
            }
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in goblinArr) {
            if (goblinArr[i].x == this.x && goblinArr[i].y == this.y) {
                goblinArr.splice(i, 1)
            }
        }
    }
}