var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Water extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
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
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.multiply >= 8) {

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 6;
            waterHashiv++;
            let water = new Water(x, y);
            waterArr.push(water);

            this.multiply = 0;
        }


    }

    eat() {
        let emptyCells = this.chooseCell(5);
        let newCell = random(emptyCells);

        if (newCell) {

            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 6;
            matrix[this.y][this.x] = 0;

            for (let i in goblinArr) {
                if (goblinArr[i].x == x && goblinArr[i].y == y) {
                    goblinArr.splice(i, 1)
                }
            }

            this.y = y;
            this.x = x;

        }
    }
}