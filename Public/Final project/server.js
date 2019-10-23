
//! Requiring modules  --  START
let count =true;
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Hunter = require("./modules/Hunter.js");
var Goblin = require("./modules/Goblin.js");
var Predator = require("./modules/Predator.js");
var Water = require("./modules/Water.js");
var Fish = require("./modules/Fish.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
hunterArr = [];
goblinArr = [];
predatorArr = [];
waterArr = [];
fishArr = [];
matrix = [];

//! Setting global arrays  -- END
grassHashiv = 0;
predatorHashiv = 0;
hunterHashiv = 0;
goblinHashiv = 0;
eaterHashiv = 0;
waterHashiv = 0;
fishHashiv = 0;





//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, predator, hunter, goblin, water, fish) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0 - 39
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < hunter; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < goblin; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < water; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
    for (let i = 0; i < fish; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 7;
    }
}

matrixGenerator(30, 10, 5, 2, 1, 10, 1);

//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                eaterHashiv++;
            }
            if (matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            }
            if (matrix[y][x] == 4) {
                let hunter = new Hunter(x, y);
                hunterArr.push(hunter);
                hunterHashiv++;
            }
            if (matrix[y][x] == 5) {
                let goblin = new Goblin(x, y);
                goblinArr.push(goblin);
                goblinHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var water = new Water(x, y);
                waterArr.push(water); 
                waterHashiv++;
            }
            else if (matrix[y][x] == 7) {
                var fish = new Fish(x, y);
                fishArr.push(fish);
                fishHashiv++;

            }
            
        }
    }
}
creatingObjects();

let exanak = 0;
let weather = "зима";

function game() {
    exanak++;
    if (exanak <= 10) {
        weather = "лето";
    }
    else if (exanak <= 20) {
        weather = "осень";
    }
    else if (exanak <= 30) {
        weather = "зима";
    }
    else if (exanak <= 40) {
        weather = "весна";
    }
    else if (exanak == 50) {
        exanak = 0;
    }

    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].eat();
        }
    }
    if (hunterArr[0] !== undefined) {
        for (var i in hunterArr) {
            hunterArr[i].kill();
        }
    }
    if (goblinArr[0] !== undefined) {
        for (var i in goblinArr) {
            goblinArr[i].kill();
        }
    }
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].mul();
            
            if (waterArr.length == 10 && count ) {
                count =false
                let curr = random(waterArr);
                for (var l = 0; l < 2; l++) {
                    matrix[curr.y][curr.x] = 7;
                    let fish = new Fish(curr.x, curr.y);
                    fishArr.push(fish)
                }
    
                for (let i in waterArr) {
                    if (waterArr[i].x == curr.x && waterArr[i].y == curr.y) {
                        waterArr.splice(i, 1)
                    }
                }
                 count = 0;
            }
        }
    }
    if (fishArr[0] !== undefined) {
        for (let i in fishArr) {
            fishArr[i].move();
        }
    }
    

    //! Object to send
    let sendData = {
        matrix: matrix,

        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,

        grassEaterCounter: eaterHashiv,
        grassEaterLiveCounter: grassEaterArr.length,

        predatorCounter: predatorHashiv,
        predatorLiveCounter: predatorArr.length,

        hunterCounter: hunterHashiv,
        hunterLiveCounter: hunterArr.length,

        goblinCounter: goblinHashiv,
        goblinLiveCounter: goblinArr.length,

        waterCounter: waterHashiv,
        waterLiveCounter: waterArr.length,

        fishCounter: fishHashiv,
        fishLiveCounter: fishArr.length,

        weather: weather
    }


    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 500)
