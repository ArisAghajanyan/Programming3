
//! Setup function fires automatically
function setup() {

    var socket = io();

    var side = 30;

    var matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassLiveCountElement = document.getElementById('grassLiveCount');

    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let grassEaterLiveCountElement = document.getElementById('grassEaterLiveCount');
    

    let PredatorCountElement = document.getElementById('PredatorCount');
    let PredatorLiveCountElement = document.getElementById('PredatorLiveCount');

    let HunterCountElement = document.getElementById('HunterCount');
    let HunterLiveCountElement = document.getElementById('HunterLiveCount');

    let GoblinCountElement = document.getElementById('GoblinCount');
    let GoblinLiveCountElement = document.getElementById('GoblinLiveCount');

    let WaterElement = document.getElementById('WaterCount');
    let WaterLiveCountElement = document.getElementById('WaterLiveCount');

    let FishElement = document.getElementById('FishCount');
    let FishLiveCountElement = document.getElementById('FishLiveCount');

    let weatherElement = document.getElementById('weather');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable


        matrix = data.matrix;

        grassCountElement.innerText = data.grassCounter;
        grassLiveCountElement.innerText = data.grassLiveCounter;
        
        grassEaterCountElement.innerText = data.grassEaterCounter;
        grassEaterLiveCountElement.innerText = data.grassEaterLiveCounter;

        PredatorCountElement.innerText = data.predatorCounter;
        PredatorLiveCountElement.innerText = data.predatorLiveCounter;

        HunterCountElement.innerText = data.hunterCounter;
        HunterLiveCountElement.innerText = data.hunterLiveCounter;
        
        GoblinCountElement.innerText = data.goblinCounter;
        GoblinLiveCountElement.innerText = data.goblinLiveCounter;

        WaterElement.innerText = data.waterCounter;
        WaterLiveCountElement.innerText = data.waterLiveCounter;

        FishElement.innerText = data.fishCounter;
        FishLiveCountElement.innerText = data.fishLiveCounter;

        weatherElement.innerText = data.weather;

        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (data.weather == "лето"){
                    fill("rgb(255, 131, 63)");
                    }
                    else if (data.weather == "осень"){
                    fill("rgb(255, 186, 63)");
                    }
                    else if (data.weather == "зима"){
                    fill("rgb(255, 255, 255)");
                    }
                    else if (data.weather == "весна"){
                    fill("rgb(255, 252, 63)");
                    }
                } else if (matrix[i][j] == 2) {
                    if (data.weather == "лето"){
                        fill("rgb(255, 131, 63)");
                        }
                        else if (data.weather == "осень"){
                        fill("rgb(155, 108, 63)");
                        }
                        else if (data.weather == "зима"){
                        fill("rgb(60, 108, 63)");
                        }
                        else if (data.weather == "весна"){
                        fill("rgb(60, 108, 25)");
                        }
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                } else if (matrix[i][j] == 3) {
                    if (data.weather == "лето"){
                        fill("rgb(253, 0, 2)");
                        }
                        else if (data.weather == "осень"){
                        fill("rgb(253, 67, 2)");
                        }
                        else if (data.weather == "зима"){
                        fill("rgb(253, 91, 2)");
                        }
                        else if (data.weather == "весна"){
                        fill("rgb(253, 113, 2)");
                        }
                } else if (matrix[i][j] == 4) {
                    if (data.weather == "лето"){
                        fill("rgb(89, 0, 159)");
                        }
                        else if (data.weather == "осень"){
                        fill("rgb(134, 0, 159)");
                        }
                        else if (data.weather == "зима"){
                        fill("rgb(196, 0, 159)");
                        }
                        else if (data.weather == "весна"){
                        fill("rgb(224, 0, 159)");
                        }
                } else if (matrix[i][j] == 5) {
                    if (data.weather == "лето"){
                        fill("rgb(128, 128, 0)");
                        }
                        else if (data.weather == "осень"){
                        fill("rgb(126, 147, 0)");
                        }
                        else if (data.weather == "зима"){
                        fill("rgb(126, 177, 0)");
                        }
                        else if (data.weather == "весна"){
                        fill("rgb(73, 177, 78)");
                        }
                }
                else if (matrix[i][j] == 6) {
                    fill('blue');
                }
                else if (matrix[i][j] == 7) {
                    fill('yellow');
                }
                rect(j * side, i * side, side, side);
            }
        }
    }
}