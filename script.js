const CellContainer = document.getElementById('cell-container');
const gameOverText = document.getElementById('text');
const pointSystem = document.getElementById('points');
const pointScore = document.getElementById('point-score');
const sound2 = new Audio('sound1.wav');
const sound1 = new Audio('walk.wav');
const sound3 = new Audio('hurt.wav');
let score = 0;
let rowCount = 10;
let colCount = 15;
cells = [];
let x = 0;
let y = 0;
// let enemy = { x: 14, y: 1, data: 6, direction: "down" }
let testMode = false;

// document.getElementById("cell-container").style.backgroundImage = "url('art2.jpg')";
function start() {
    createBoard();
    if (!testMode)
        setInterval(randomizeAI, 1000);
    // Blocks
    createLevel([{ x: 5, y: 8, data: 5 }, { x: 3, y: 1, data: 5 }, { x: 0, y: 1, data: 5 }, { x: 2, y: 0, data: 5 }, { x: 1, y: 2, data: 5 }, { x: 3, y: 2, data: 5 }, { x: 1, y: 4, data: 5 },
    { x: 4, y: 3, data: 5 }, { x: 2, y: 4, data: 5 }, { x: 1, y: 6, data: 5 }, { x: 1, y: 2, data: 5 }, { x: 3, y: 6, data: 5 }, { x: 4, y: 6, data: 5 }, { x: 4, y: 5, data: 5 }, { x: 4, y: 5, data: 5 },
    { x: 3, y: 7, data: 5 }, { x: 1, y: 8, data: 5 }, { x: 2, y: 9, data: 5 }, { x: 5, y: 6, data: 5 }, { x: 7, y: 2, data: 5 }, { x: 7, y: 7, data: 5 }, { x: 13, y: 1, data: 5 },
    { x: 6, y: 5, data: 5 }, { x: 6, y: 9, data: 5 }, { x: 9, y: 7, data: 5 }, { x: 11, y: 7, data: 5 }, { x: 8, y: 4, data: 5 }, { x: 6, y: 3, data: 5 }, { x: 8, y: 8, data: 5 },
    { x: 5, y: 1, data: 5 }, { x: 10, y: 5, data: 5 }, { x: 10, y: 4, data: 5 }, { x: 9, y: 2, data: 5 }, { x: 8, y: 0, data: 5 }, { x: 7, y: 0, data: 5 }, { x: 10, y: 0, data: 5 },
    { x: 11, y: 1, data: 5 }, { x: 11, y: 3, data: 5 }, { x: 13, y: 2, data: 5 }, { x: 12, y: 5, data: 5 }, { x: 13, y: 6, data: 5 }, { x: 13, y: 8, data: 5 }, { x: 11, y: 0, data: 5 },
    { x: 14, y: 9, data: 5 }, { x: 14, y: 0, data: 5 }, { x: 0, y: 9, data: 5 }, { x: 0, y: 8, data: 5 }, { x: 1, y: 9, data: 5 }, { x: 5, y: 9, data: 5 }, { x: 8, y: 7, data: 5 }
    ])
    boxBackground(y, x);
    randomizeCoin();
    updateBoard();
    // testing();

    // document.getElementsByClassName('cell').style.backgroundColor = "white";
    document.onkeydown = function (e) {
        document.getElementById(`${y}_${x}`).style.backgroundImage = 'none';
        switch (e.keyCode) {
            // left
            case 37:
                if (x < colCount) {

                    if (x != 0) {
                        if (checkData(y, x - 1) == 5)
                            gameOver();
                        if (checkData(y, x - 1) == 10) {
                            addCoin();
                            setData(y, x - 1);
                        }
                        sound1.play();
                        x--;

                    }
                    boxBackground(y, x);
                }
                break;
            case 38:
                if (y < rowCount) {

                    if (y != 0) {
                        if (checkData(y - 1, x) == 5)
                            gameOver();
                        if (checkData(y - 1, x) == 10) {
                            addCoin();
                            setData(y - 1, x, 0);
                        }
                        sound1.play();
                        y--;

                    }
                    boxBackground(y, x);
                }
                break;
            case 39:
                if (x < colCount) {

                    if (x != colCount - 1) {
                        if (checkData(y, x + 1) == 5)
                            gameOver();
                        if (checkData(y, x + 1) == 10) {
                            addCoin();
                            setData(y, x + 1, 0);
                        }
                        sound1.play();
                        x++;

                    }
                    // if (ex < x) ex--;
                    boxBackground(y, x);
                }
                break;
            case 40:
                if (y < rowCount) {

                    if (y != rowCount - 1) {
                        if (checkData(y + 1, x) == 5)
                            gameOver();
                        if (checkData(y + 1, x) == 10) {
                            addCoin();
                            setData(y + 1, x, 0);
                        }
                        sound1.play();
                        y++;

                    }
                    boxBackground(y, x);
                }
                break;
        }

    };

}

let death = 0;

function gameOver() {
    sound3.play();
    CellContainer.style.opacity = "0.3";
    gameOverText.style.display = "";

    pointSystem.style.display = "none";
    death = death + 1;
    youDie();
}

function youDie() {
    if (death == 1) {
        pointScore.innerHTML = "Final score: " + score;
    }
}

// if ey < y, flytt, if ex < x, flytt
function createBoard() {
    for (let y = 0; y < rowCount; y++) {
        for (let x = 0; x < colCount; x++) {

            cells[y] = [];
            cells[y][x] = document.createElement('div');
            CellContainer.appendChild(cells[y][x]);
            cells[y][x].classList.add('cell');
            cells[y][x].style.top = (70 * y) + "px";
            cells[y][x].style.left = (70 * x) + "px";
            cells[y][x].id = `${y}_${x}`;
            cells[y][x].setAttribute('data', 0);
        }
    }
}

function checkData(y, x) {
    if (x < 0 || y < 0 || x > 14 || y > 9)
        return 5;
    return document.getElementById(`${y}_${x}`).getAttribute('data');
}

function checkFree(y, x) {
    console.log(document.getElementById(`${y}_${x}`).getAttribute('data'));

    if (document.getElementById(`${y}_${x}`).getAttribute('data') == 0)
        return true;
    return false;
}

function setData(y, x, data) {
    document.getElementById(`${y}_${x}`).setAttribute('data', data);
}
//[{x:5,y:8,data:5},{x:4, y:4,data:5}]
function createLevel(arr) {
    for (i = 0; i < arr.length; i++) {
        setData(arr[i].y, arr[i].x, arr[i].data)
    }
}

function updateBoard() {
    for (let y = 0; y < rowCount; y++) {
        for (let x = 0; x < colCount; x++) {
            if (checkData(y, x) == 5) {
                document.getElementById(`${y}_${x}`).style.backgroundColor = "black";
            }
            if (checkData(y, x) == 10) {
                document.getElementById(`${y}_${x}`).style.backgroundImage = 'url(coin.png)';
            }
            if (checkData(y, x) == 6) {
                document.getElementById(`${y}_${x}`).style.backgroundColor = "red"
            }
        }
    }
}

// function testing() {
//     let arr = [
//         { y: 0, x: 6, result: "down" },
//         { y: 7, x: 9, result: "up" },

//     ]
//     for (let i = 0; i < arr.length; i++) {
//         if (randomizeAI2(arr[i]) == arr[i].result)
//             console.log(true);
//         else console.log(false);

//     }
// }

function clearData(y, x) {
    document.getElementById(`${y}_${x}`).setAttribute('data', 0);
    document.getElementById(`${y}_${x}`).style.backgroundColor = "";
    console.log(y, x);

}

function addCoin() {
    sound2.play();
    randomizeCoin();
    updateBoard();
    score++;
    pointSystem.innerHTML = "Score: " + score;
}

function randomizeCoin() {
    let ready = true;
    while (ready) {
        let x = Math.floor(Math.random() * 15);
        let y = Math.floor(Math.random() * 10);
        if (checkData(y, x) == 0) {
            setData(y, x, 10);

            ready = false;
        }
    }
}

function isFree(y, x, direction) { //check if next position is free//
    let data = false;
    console.log(y, x, direction);

    switch (direction) {
        case "up":
            if (y == 0)
                data = false;
            else
                data = checkFree(y - 1, x)
            break;

        case "down":
            if (rowCount - 1 == y)
                data = false;
            else
                data = checkFree(y + 1, x)
            break;
        case "left":
            if (x == 0)
                data = false;
            else
                data = checkFree(y, x - 1)
            break;

        case "right":
            if (x == colCount - 1)
                data = false;
            else
                data = checkFree(y, x + 1)
            break;
    }
    return data;
}

function randomizeAI2(position = false) {
    enemy.y = position.y
    enemy.x = position.x
    if (checkData(enemy.y, enemy.x - 1) == 0 && enemy.x != 0) {//free space to the left, Go left//
        return "left";
    } else if (checkData(enemy.y + 1, enemy.x) == 5 && enemy.y, enemy.x - 1 < 0) { //Block under + left Go up//
        return "up";
    }
    else if (checkData(enemy.y + 1, enemy.x + 1) == 5) {
        enemy.y++;
        setData(enemy.y, enemy.x, enemy.data)
    }
    else if (checkData(enemy.y - 1, enemy.x) == 0) {
        enemy.y--;
        setData(enemy.y, enemy.x, enemy.data)


    }
    //  else if (checkData(enemy.y + 1, enemy.x) == 0) {
    //     enemy.y++;
    //     setData(enemy.y, enemy.x, enemy.data)
    //     console.log("6");
    // }
    // else if (checkData(enemy.y - 1, enemy.x) == 0 && enemy.y < y) {
    //     enemy.y--;
    //     setData(enemy.y, enemy.x, enemy.data) //Go down//
    // }
    updateBoard();
}

function randomizeAI(position = false) {
    clearData(enemy.y, enemy.x); //Go left//
    let foundMove = false;

    while (!foundMove) {
        console.log(enemy.direction);

        switch (enemy.direction) {
            case "down":
                if (isFree(enemy.y, enemy.x, "down") && isFree(enemy.y, enemy.x, "right")) {

                    enemy.x++;
                    enemy.direction = "right";
                    foundMove = true;
                } else if (isFree(enemy.y, enemy.x, "down") && isFree(enemy.y, enemy.x, "right")) {
                    enemy.x++;
                    enemy.direction = "right";
                    foundMove = true;
                }
                else {
                    enemy.direction = "left";
                }
                break;
            case "left":


                if (isFree(enemy.y, enemy.x, "up") && !isFree(enemy.y, enemy.x, "left") && isFree(enemy.y, enemy.x, "down")) {
                    enemy.y++;
                    enemy.direction = "down"
                    foundMove = true;
                }
                else if (!isFree(enemy.y, enemy.x, "up") && !isFree(enemy.y, enemy.x, "left") && isFree(enemy.y, enemy.x, "down")) {
                    enemy.y++;
                    enemy.direction = "down"
                    foundMove = true;
                }
                else {
                    enemy.direction = "up";
                }
                break;
            case "up":
                if (isFree(enemy.y, enemy.x, "left")) {
                    enemy.x--;
                    foundMove = true;
                    enemy.direction = "left";
                }
                else if (isFree(enemy.y, enemy.x, "up")) {


                    enemy.y--;
                    enemy.direction = "up"
                    foundMove = true;

                } else {
                    enemy.direction = "right";
                }
                break;
            case "right":
                if (isFree(enemy.y, enemy.x, "up")) {
                    enemy.y--;
                    enemy.direction = "up";
                    foundMove = true;
                }
                else if (!isFree(enemy.y, enemy.x, "right") && isFree(enemy.direction, enemy.x, "down")) {


                    enemy.y++;
                    enemy.direction = "down"
                    foundMove = true;
                } else {
                    enemy.direction = "left";
                }
                break;
        }
    }
    setData(enemy.y, enemy.x, enemy.data)


    // if (checkData(enemy.y, enemy.x - 1) == 0 && enemy.x != 0) {
    //     console.log(enemy.x);

    //     enemy.x--;
    //     setData(enemy.y, enemy.x, enemy.data) //Go down//
    // } else if (checkData(enemy.y - 1, enemy.x - 1) == 5) {
    //     enemy.y++;
    //     setData(enemy.y, enemy.x, enemy.data)
    // }
    // else if (checkData(enemy.y + 1, enemy.x + 1) == 5) {
    //     enemy.y++;
    //     setData(enemy.y, enemy.x, enemy.data)
    // }
    // else if (checkData(enemy.y - 1, enemy.x) == 0) {
    //     enemy.y--;
    //     setData(enemy.y, enemy.x, enemy.data)
    //     console.log("5");

    // }

    updateBoard();
}






function boxBackground(y, x) {
    document.getElementById(`${y}_${x}`).style.backgroundImage = "url(cow.png)";
}

start();