let currentMarker = "X";

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let playerXWins = 0;
let playerOWins = 0;

const handleClick = (element) => {
  if (!document.getElementById(element.id).innerHTML) {
    updateColor(element.id);
    addMarker(element.id);
    updateBoard(element.id);
    checkForWin();
    playerTurn();
  }
};

const updateColor = (id) => {
  switch (currentMarker) {
    case "X":
      document.getElementById(id).style.color = "#6c99bb";
      break;
    case "O":
      document.getElementById(id).style.color = "#e87d3e";
      break;
  }
};

const addMarker = (id) => {
  document.getElementById(id).innerHTML = currentMarker;
};

const updateBoard = (id) => {
  const row = parseInt(id.charAt(0));
  const column = parseInt(id.charAt(2));
  board[row][column] = currentMarker;
};

const checkForWin = () => {
  if (horizontalWin() || verticalWin() || diagonalWin()) {
    setTimeout(() => alert(`Player ${currentMarker} won!`), 300);
    setTimeout(() => resetBoard(), 300);
    updateWins();
  } else {
    changeMarker();
  }
};

const horizontalWin = () => {
  if (
    (board[0][0] === "X" && board[0][1] === "X" && board[0][2] === "X") ||
    (board[1][0] === "X" && board[1][1] === "X" && board[1][2] === "X") ||
    (board[2][0] === "X" && board[2][1] === "X" && board[2][2] === "X") ||
    (board[0][0] === "O" && board[0][1] === "O" && board[0][2] === "O") ||
    (board[1][0] === "O" && board[1][1] === "O" && board[1][2] === "O") ||
    (board[2][0] === "O" && board[2][1] === "O" && board[2][2] === "O")
  ) {
    return true;
  } else {
    return false;
  }
};

const verticalWin = () => {
  if (
    (board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X") ||
    (board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X") ||
    (board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X") ||
    (board[0][0] === "O" && board[1][1] === "O" && board[2][0] === "O") ||
    (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O") ||
    (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O")
  ) {
    return true;
  } else {
    return false;
  }
};

const diagonalWin = () => {
  if (
    (board[0][0] === "X" && board[1][1] === "X" && board[2][2] === "X") ||
    (board[0][2] === "X" && board[1][1] === "X" && board[2][0] === "X") ||
    (board[0][0] === "O" && board[1][1] === "O" && board[2][2] === "O") ||
    (board[0][2] === "O" && board[1][1] === "O" && board[2][0] === "O")
  ) {
    return true;
  } else {
    return false;
  }
};

const updateWins = () => {
  currentMarker === "X" ? playerXWins++ : playerOWins++;
  const playerX = document.querySelector(".player-x");
  const playerO = document.querySelector(".player-o");
  if (playerXWins > 0) {
    playerX.innerHTML = (`Player X has ${playerXWins} win`)
  }
  if (playerXWins > 1) {
    playerX.innerHTML += ('s')
  }
  if (playerOWins > 0) {
    playerO.innerHTML = (`Player O has ${playerOWins} win`)
  }
  if (playerOWins > 1) {
    playerO.innerHTML += ('s')
  }
};

const changeMarker = () => {
  currentMarker = currentMarker === "X" ? "O" : "X";
};

const resetBoard = () => {
  console.log("the board was cleared!");
  const squares = document.getElementsByTagName("TD");
  for (i = 0; i < squares.length; i++) {
    console.log(squares[i]);
    squares[i].innerHTML = null;
  }

  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  checkBoard();
};

const clearWins = () => {
    document.querySelector(".player-x").innerHTML = null;
    document.querySelector(".player-o").innerHTML = null;
    playerXWins = 0;
    playerOWins = 0;
}

const changeButton = () => {
    const button = document.createElement('button');
    button.innerText = 'Change first player';
    button.addEventListener('click', () => {
      currentMarker = currentMarker === "X" ? "O" : "X";
      playerTurn();
      document.querySelector(".change-button").innerHTML = null;
    })
    document.querySelector(".change-button").appendChild(button);
}

const playerTurn = () => {
    const currentPlayer = document.querySelector(".current-player");
    switch (currentMarker) {
        case "X":
          currentPlayer.style.color = "#6c99bb";
          break;
        case "O":
          currentPlayer.style.color = "#e87d3e";
          break;
      }
    currentPlayer.innerHTML = (`Player ${currentMarker}'s turn `);
}

const checkBoard = () => {
    if (board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ]) {
        changeButton();
    } else {
        document.querySelector(".change-button").innerHTML = null;
    }
}

playerTurn();
checkBoard();
