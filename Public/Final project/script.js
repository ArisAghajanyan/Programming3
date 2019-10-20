
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

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassLiveCountElement.innerText = data.grassLiveCounter;
        
        grassEaterCountElement.innerText = data.grassEaterCounter;
        grassEaterLiveCountElement.innerText = data.grassEaterLiveCounter;

        PredatorCountElement.innerText = data.PredatorCounter;
        PredatorLiveCountElement.innerText = data.PredatorLiveCounter;

        HunterCountElement.innerText = data.HunterCounter;
        HunterLiveCountElement.innerText = data.HunterLiveCounter;
        
        GoblinCountElement.innerText = data.GoblinCounter;
        GoblinLiveCountElement.innerText = data.GoblinLiveCounter;






        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {

                if (matrix[i][j] == 1) {
                    if (data.weather == "Summer"){
                    fill("green");
                    }
                    else if (data.weather == "Autumn"){
                    fill("Brawn");
                    }
                    else if (data.weather == "Winter"){
                    fill("White");
                    }
                    else if (data.weather == "Spring"){
                    fill("Gold");
                    }
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('purple');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('olive');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}