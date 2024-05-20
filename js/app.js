//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.
/*-------------------------------- Constants --------------------------------*/

const squareEls = Array.from(document.querySelectorAll('.sqr'));

const messageEl = document.querySelector('#message');

const resetBtnEl = document.querySelector('#reset');

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

let board = ['', '', '', '', '', '', '', '', '']; 
let turn = 'X';
let winner = false;
let tie = false;

const choices = ['X', 'O'];

const updateBoard = () => {
    board.forEach((cell, index) => {
      const square = squareEls[index];
      square.textContent = cell; 
      
      if (cell === 'X') {
        square.style.color = 'red';
      } else if (cell === 'O') {
        square.style.color = 'blue';
      } else {
        square.style.color = 'black';
      }
    });
};

const updateMessage = () => {
  if (!winner && !tie) {
      messageEl.textContent = `It's ${turn}'s turn.`;
  } else if (!winner && tie) {
      messageEl.textContent = "It's a tie!";
  } else {
      messageEl.textContent = `Congratulations, ${winner} has won!`;
  }
};

const checkForWinner = () => {
    for (let combo of winningCombos) {
        const [a, b, c] = combo ;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = turn;
            return;
        }
    }
};

const checkForTie = () => {
    if (winner) return;
    tie = board.every(cell => cell !== '');
    console.log(tie);
    
};

const switchPlayerTurn = () => {
  if (winner) return;
  turn = turn === 'X' ? 'O' : 'X'
  console.log(turn);
}

const placePiece = (index) => {
    board[index] = turn;
    console.log(board);
};

const handleClick = (event) => {
    const square = event.target;
    const index = squareEls.indexOf(square);
  
    if (board[index] === '' && !winner) {
      placePiece(index);
      checkForWinner();
      checkForTie();
      switchPlayerTurn();
      render();
    }
};

squareEls.forEach(square => {
    square.addEventListener('click', handleClick);
});

const init = () => {
  console.log("App has initialized!");
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  render();
};

const render = () => {
    console.log("Render function called!");
    updateBoard();
    updateMessage();
};

resetBtnEl.addEventListener('click', init);

window.onload = init;
