var mazeArr = [];

function appButton(index) {
    var btn = document.createElement("button");
    var txt = document.createTextNode(index);
    btn.appendChild(txt);
    btn.className = "maze-btn";
    btn.onclick = function () {
        if (this.style.background == "black") {
            this.style.background = "#dbdbdb";
            this.style.color = "white";
        } else {
            this.style.background = "black";
            this.style.color = "black";
        }
        mazeSolver();
    };
    var parent = document.getElementById("maze");
    parent.appendChild(btn);
}

function drawMaze(total) {
    for (count = 0; count < total; count++) {
        appButton(count);
    }
    var btns = document.getElementsByClassName('maze-btn');
    btns[0].innerHTML = 'START';
    btns[0].style.background = '#38a140';
    btns[0].style.color = 'white';
    btns[0].onclick = function () { };
    btns[255].innerHTML = 'END';
    btns[255].style.background = '#c25555';
    btns[255].style.color = 'white';
    btns[255].onclick = function () { };
}

function indexValue(row, col) {
    return (row * 16 + col);
}


function paintInitialState() {
    var btns = document.getElementsByClassName('maze-btn');
    for (i = 0; i < 16; i++) {
        for (j = 0; j < 16; j++) {
            if (mazeArr[i][j] == 1) {
                btns[indexValue(i, j)].style.background = "black";
                btns[indexValue(i, j)].style.color = "black";
            } else {
                btns[indexValue(i, j)].style.background = "#dbdbdb";
                btns[indexValue(i, j)].style.color = "#dbdbdb";

            }
        }
    }
}

function initialiseMazeArr() {
    mazeArr = []
    for (i = 0; i < 16; i++) {
        var temp = [];
        for (j = 0; j < 16; j++) {
            temp.push(0);
        }
        mazeArr.push(temp);
    }
}


function mazeSolver() {
    initialiseMazeArr();

    var btns = document.getElementsByClassName('maze-btn');
    for (ind = 0; ind < btns.length; ind++) {
        const value = Number(btns[ind].innerHTML);
        var row = Math.floor(value / 16);
        var col = value % 16;
        if (btns[ind].style.background == 'black') {
            mazeArr[row][col] = 1;
        }
    }

    paintInitialState();
    // console.log(mazeArr);
    var qu_x = [], qu_y = [];
    qu_x.push(0);
    qu_y.push(0);
    var vis = [], parent = [];

    //initialising visited array
    for (i = 0; i < 16; i++) {
        var temp = [];
        for (j = 0; j < 16; j++) {
            temp.push(0);
        }
        vis.push(temp);
    }
    for (i = 0; i < 255; i++) {
        parent.push(0);
    }

    vis[0][0] = 1;
    var found = false;
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    console.log(qu_x, qu_y);
    while (qu_x.length) {
        const src_x = qu_x.shift();
        const src_y = qu_y.shift();


        console.log(qu_x, qu_y);

        if (src_x == 15 && src_y == 15) {
            found = true;
        }
        for (i = 0; i < 4; i++) {
            var next_x = src_x + dr[i];
            var next_y = src_y + dc[i];

            if (next_x < 16 && next_x >= 0 && next_y < 16 && next_y >= 0) {
                if (mazeArr[next_x][next_y] == 0 && vis[next_x][next_y] == 0) {
                    qu_x.push(next_x);
                    qu_y.push(next_y);
                    parent[indexValue(next_x, next_y)] = indexValue(src_x, src_y);
                    vis[next_x][next_y] = 1;
                }
            }

        }

    }
    if (found) {
        var btns = document.getElementsByClassName('maze-btn');
        btns[0].style.background = '#38a140';
        btns[0].style.color = 'white';
        btns[255].style.background = '#38a140';
        btns[255].style.color = 'white';
        var par = parent[255];
        while (par != 0) {
            btns[par].style.background = '#86d98c';
            btns[par].style.color = '#86d98c';
            par = parent[par];
        }
    } else {
        btns[0].style.background = '#c25555';
        btns[0].style.color = 'white';
        btns[255].style.background = '#c25555';
        btns[255].style.color = 'white';
        // alert("SORRY! NO PATH");
    }

}



drawMaze(256);
