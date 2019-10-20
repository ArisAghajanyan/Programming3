
            //! Requiring modules  --  START
            var Grass = require("./modules/Grass.js");
            var GrassEater = require("./modules/GrassEater.js");
            var Hunter = require("./modules/Hunter.js");
            var Goblin = require("./modules/Goblin.js");
            var Predator = require("./modules/Predator.js");
            let random = require('./modules/random');
            //! Requiring modules  --  END


                        //! Setting global arrays  --  START
            grassArr = [];
            grassEaterArr = [];
            hunterArr = [];
            goblinArr = [];
            predatorArr= [];
            matrix = [];

            //! Setting global arrays  -- END
            grassHashiv = 0;
            PredatorHashiv = 0;
            HunterHashiv = 0;
            GoblinHashiv = 0;
            EaterHashiv = 0;





//! Creating MATRIX -- START
 function matrixGenerator(matrixSize, grass, grassEater, predator, hunter,goblin) {
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = [];
            for (let o = 0; o < matrixSize; o++) {
                matrix[i][o] = 0;
            }
        }
        for (let i = 0; i < grass; i++) {
            let customX = Math.floor(random(0, matrixSize)); // 0 - 39
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 1;
        }
        for (let i = 0; i < grassEater; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 2;
        }
        for (let i = 0; i < predator; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 3;
        }
        for (let i = 0; i < hunter; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 4;
        }
        for (let i = 0; i < goblin; i++) {
            let customX = Math.floor(random(0, matrixSize));
            let customY = Math.floor(random(0, matrixSize));
            matrix[customY][customX] = 5;
        }
    }
    
    matrixGenerator(30, 10, 6, 4, 4, 7);
            //! Creating MATRIX -- END



        //! SERVER STUFF  --  START
        var express = require('express');
        var app = express();
        var server = require('http').Server(app);
        var io = require('socket.io')(server);
        app.use(express.static("."));
        app.get('/', function (_req, res) {
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
                EaterHashiv++;
            }
            if (matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator);
                PredatorHashiv++;
            }
            if (matrix[y][x] == 4) {
                let hunter = new Hunter(x, y);
                hunterArr.push(hunter);
                HunterHashiv++;
            }
            if (matrix[y][x] == 5) {
                let goblin = new Goblin(x, y);
                goblinArr.push(goblin);
                GoblinHashiv++;
            }
        }
    }
}
            creatingObjects();

                let exanak = 0;
                let weather= "Winter";

function game() {
    exanak++;
    if (exanak <= 10) {
        weather = "Summer";
        
    }
    else if (exanak <= 20) {
        weather = "Autumn";
        
    }
    else if (exanak <= 30) {
        weather = "Winter";
        
    }
    else if (exanak <= 40) {
        weather = "Spring";
        
    }
    else if (exanak == 50) {
        exanak = 0 ;
        
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
    if (predatorArr[0] !== undefined){
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (hunterArr[0] !== undefined){
        for (var i in hunterArr) {
            hunterArr[i].kill();
        }
    }
    if (goblinArr[0] !== undefined){
        for (var i in goblinArr) {
            goblinArr[i].kill();
        }
    }  
        

    


    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,

        grassEaterCounter: EaterHashiv,
        grassEaterLiveCounter: grassEaterArr.length,

        PredatorCounter: PredatorHashiv,
        PredatorLiveCounter: predatorArr.length,

        HunterCounter: HunterHashiv,
        HunterLiveCounter: hunterArr.length,

        GoblinCounter: GoblinHashiv,
        GoblinLiveCounter: goblinArr.length,
        weather: weather
    }
    

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)
