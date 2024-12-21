// Made By: Vicky2k7.
// Incredibly simple tic tac toe version created with the Html Canvas

// CIRCLES ARE DEFINED AS 0, CROSSES ARE DEFINED AS 1.

let c, ctx;
let quit = false;
let mouseX, mouseY;

const grid = [
    [false, false, false],
    [false, false, false],
    [false, false, false]
];
let turn = 0;

window.onload = () => {
    c = document.getElementById ("gc");
    ctx = c.getContext("2d");

    window.addEventListener ( "mousemove", e => {
       const rect = c.getBoundingClientRect();

       mouseX = e.clientX - rect.x;
       mouseY = e.clientY - rect.y;
    });

    window.addEventListener ("click", () => {
        if ( withinCanvasBounds (mouseX, mouseY) ) {
            const box = findBoxFromPos ( mouseX, mouseY );
            if ( grid [box.i][box.j] === false ) {
                grid [box.i][box.j] = (turn == 0) ? 0:1
                turn = (turn == 0) ? 1: 0;

                const win = checkForWin (grid);
                console.log (win);
                if ( win ) quit = true;
            }
        }
    })

    draw();
}

function draw () {
    ctx.fillStyle = "lightgray";
    ctx.strokeStyle = "black";
    ctx.lineCap = "round";

    ctx.fillRect (0, 0, c.width, c.height);

    ctx.lineWidth = 3;
    for ( let i = 1; i <= 2; i++ ) {
        ctx.beginPath();
        ctx.moveTo ( 0, i*(c.width/3) );
        ctx.lineTo ( c.width, i*(c.width/3) );
        ctx.stroke();
    }
    for ( let i = 1; i <= 2; i++ ) {
        ctx.beginPath();
        ctx.moveTo ( i*(c.height/3), 0 );
        ctx.lineTo ( i*(c.height/3), c.height );
        ctx.stroke();
    }

    for ( let i = 0; i < grid.length; i++ )
        for ( let j = 0; j < grid[i].length; j++ ) {
            if ( grid[i][j] === 0) drawCircle (i*(c.width/3)+c.width/6, j*(c.width/3)+c.height/6, 50);
            if ( grid[i][j] === 1) drawCross (i*(c.width/3)+c.width/(3*2), j*(c.width/3)+c.height/6, 50);  
        }

    if (!quit) {
        requestAnimationFrame (draw);
    } else {
        const win = checkForWin (grid);
        ctx.strokeStyle = "rgb(255, 0, 0, 0.5)";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo ( win[0].i*(c.width/3)+c.width/6, win[0].j*(c.width/3)+c.height/6 );
        ctx.lineTo ( win[1].i*(c.width/3)+c.width/6, win[1].j*(c.height/3)+c.height/6 );
        ctx.stroke();

        return
    }

    
    // Show cursor.
    ctx.strokeStyle = "gray";
    const pos = findBoxFromPos (mouseX, mouseY);
    if (withinCanvasBounds (mouseX, mouseY) && grid[pos.i][pos.j] === false){
        if ( turn == 0 ) drawCircle ( pos.x, pos.y, 50 );
        if ( turn == 1 ) drawCross ( pos.x, pos.y, 50 );
    }
    
    if ( !navigator.userAgent.mobile ) {
        ctx.strokeStyle = "black";
        if ( turn == 0 ) drawCircle ( mouseX+15, mouseY, 5 );
        if ( turn == 1 ) drawCross ( mouseX+15, mouseY, 5 );
    }
}

function drawCross ( x, y, l ) {
    ctx.beginPath();
    ctx.moveTo (x-l, y-l);
    ctx.lineTo (x+l, y+l);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo ( x-l, y+l );
    ctx.lineTo ( x+l, y-l );
    ctx.stroke();
}

function drawCircle ( x, y, r ) {
    ctx.beginPath();
    ctx.arc (x, y, r, 0, Math.PI*2);
    ctx.stroke();
}

const findBoxFromPos = (x, y, d=3) => {
    const i = Math.floor (x/(c.width/d));
    const j =  Math.floor (y/(c.height/d));

    return {
        x: i*(c.width/d)+c.width/(d*2),
        y: j*(c.width/d)+c.height/(d*2),
        i,j
    }
}

const withinCanvasBounds = (x, y) => {return (x >= 0 && x <= c.width && y >= 0 && y <= c.height)};

function checkForWin (grid) {
    for ( let i = 0; i < grid.length; i++ ) {
        let score = 0;
        for ( let j = 0; j < grid[i].length; j++ ) 
            if ( grid[i][j] !== false ) score += grid[i][j]
            else score = -4;
        if ( score == 0 || score == 3 ) 
            return [{i, j:0}, {i, j:2}];
    }

    for ( let j = 0; j < grid[0].length; j++ ) {
        let score = 0;
        for ( let i = 0; i < grid.length; i++ ) 
            if ( grid[i][j] !== false ) score += grid[i][j]
            else score = -4;;

        if ( score == 0 || score == 3 ) 
            return [{i:0, j}, {i:2, j}];
    }

    // !! CHECK FOR DIAGONALS !!
    let score = 0;
    for ( let i = 0; i < grid.length; i++ ) {
        if ( grid[i][i] !== false ) score += grid[i][i]
            else score = -4;
        }
    if ( score == 0 || score == 3 ) 
        return [{i:0, j:0}, {i:2, j:2}];


    score = 0; // Reset score.
    for ( let i = 0; i < grid.length; i++ ) {
        if ( grid[i][2-i] !== false ) score += grid[i][2-i]
            else score = -4;
        }
    if ( score == 0 || score == 3 ) 
        return [{i:0, j:2}, {i:2, j:0}];
}


// Restart.
const rsButton = document.getElementById ("restart");
rsButton.onclick = () => {
    for ( let i = 0; i < grid.length; i++ ) 
        for ( let j = 0; j < grid[i].length; j++ ) 
            grid[i][j]=false;

    quit = false;
    draw();
}