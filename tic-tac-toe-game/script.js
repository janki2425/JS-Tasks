const statusText=document.querySelector(".status");
const cells=document.querySelectorAll(".cell");
const restart=document.querySelector(".restart");
const player_X=document.querySelector('.player-X');
const player_O=document.querySelector('.player-O');
const autoplay=document.querySelector('.autoplay');

let currentPlayer='';
let board=['','','','','','','','',''];
let game=false;
let computerPlayer='';
let iscomputerMode=false;
let isgameOn=false;

const combination=[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
]

player_X.addEventListener("click",selectPlayer);
player_O.addEventListener("click",selectPlayer);
autoplay.addEventListener("click",()=>{
    isgameOn=true;
    iscomputerMode = !iscomputerMode;
    if (iscomputerMode && game && currentPlayer === computerPlayer) {
        setTimeout(computerMove, 500);
    }
});
restart.addEventListener('click',restartGame);



function selectPlayer(e){
    if(e.target.classList.contains("player-X")){
        currentPlayer="X";
        computerPlayer="O";
    }
    else if(e.target.classList.contains("player-O")){
        currentPlayer="O";
        computerPlayer="X";
    }
    statusText.textContent=`player ${currentPlayer}'s Starts`;

    player_X.disabled=true;
    player_O.disabled=true;
    autoplay.disabled=true;


    game=true;
    if (iscomputerMode && currentPlayer === computerPlayer) {
        setTimeout(computerMove, 500);
    }
}

function cellClick(e){
    if (!game || currentPlayer === ""){
        return;
    }

    let index=e.target.dataset.index;

    if(board[index]=='' && game){
        board[index]=currentPlayer;
        e.target.textContent=currentPlayer;
        e.target.classList.add('filled');

        checkWinner();
        if (game) {
            changePlayer();

            if (iscomputerMode && currentPlayer === computerPlayer) {
                setTimeout(computerMove, 500);
            }
        }
    }
}
function changePlayer(){
    currentPlayer=currentPlayer === 'X'? 'O' : 'X';
    statusText.textContent=`player ${currentPlayer}'s turn`;
}

function computerMove(){
    if(!game || !iscomputerMode || currentPlayer !== computerPlayer){
        return;
    }
    let emptyCells=board.map((val,index)=> val=== "" ? index : null).filter(val=>val !== null)

    if(emptyCells.length > 0){
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let move =emptyCells[randomIndex]

        board[move]=currentPlayer;
        cells[move].textContent=currentPlayer;
        cells[move].classList.add('filled');

        checkWinner();
        if(game){
            changePlayer();
        }
    }
}

function checkWinner(){
    for(let combo of combination){
        const [a,b,c]=combo;
        if(board[a] && board[a]===board[b] && board[a]=== board[c]){
            statusText.textContent=`winner : ${currentPlayer}`;
            game=false;
            return;
        }
    }
    if(!board.includes('')){
        statusText.textContent="It's a Draw!...";
        game=false;
        return;
    }
}

function restartGame(){
    board=['','','','','','','','',''];
    currentPlayer='';
    computerPlayer='';
    iscomputerMode=false;
    game=false;
    statusText.textContent = 'select X or O to start';

    cells.forEach(cell => {
        cell.textContent='';
        cell.classList.remove('filled');
    });

    player_X.disabled=false;
    player_O.disabled=false;
    autoplay.disabled=false;
}
cells.forEach((cell,index) => {
    cell.dataset.index=index;
    cell.addEventListener('click',cellClick)
});
