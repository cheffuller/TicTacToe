let currentMarker = "X";

let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let playerXWins = 0;
let playerOWins = 0;

let playerXName = "";
let playerOName = "";

// function that runs when a board element is clicked
// it calls several different functions for functionality
const handleClick = (element) => {
  if (!document.getElementById(element.id).innerHTML) {
    updateColor(element.id);
    addMarker(element.id);
    updateBoard(element.id);
    checkForWin();
    playerTurn();
    checkBoard();
  }
};

// function that changes the color of the marker placed
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

// function that adds a marker to the board
const addMarker = (id) => {
  document.getElementById(id).innerHTML = currentMarker;
};

// function that updates the board array with the position of the current marker
const updateBoard = (id) => {
  const row = parseInt(id.charAt(0));
  const column = parseInt(id.charAt(2));
  board[row][column] = currentMarker;
};

// function that runs the different win case functions
const checkForWin = () => {
  if (horizontalWin() || verticalWin() || diagonalWin()) {
    setTimeout(() => alert(`Player ${currentMarker} won!`), 300);
    setTimeout(() => resetBoard(), 300);
    updateWins();
  } else {
    changeMarker();
  }
};

// function with the win case for horizontal wins
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

// function with the win case for vertical wins
const verticalWin = () => {
  if (
    (board[0][0] === "X" && board[1][0] === "X" && board[2][0] === "X") ||
    (board[0][1] === "X" && board[1][1] === "X" && board[2][1] === "X") ||
    (board[0][2] === "X" && board[1][2] === "X" && board[2][2] === "X") ||
    (board[0][0] === "O" && board[1][0] === "O" && board[2][0] === "O") ||
    (board[0][1] === "O" && board[1][1] === "O" && board[2][1] === "O") ||
    (board[0][2] === "O" && board[1][2] === "O" && board[2][2] === "O")
  ) {
    return true;
  } else {
    return false;
  }
};

// function with the win case for diagonal wins
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

// function to update the total player wins and write them to the page
const updateWins = () => {
  currentMarker === "X" ? playerXWins++ : playerOWins++;
  const playerX = document.querySelector(".player-x");
  const playerO = document.querySelector(".player-o");
  if (playerXWins > 0) {
    if (playerXName === "") {
    playerX.innerHTML = (`Player X has ${playerXWins} win`)
    } else {
        playerX.innerHTML = (`${playerXName} has ${playerXWins} win`);
    }
  }
  if (playerXWins > 1) {
    playerX.innerHTML += ('s')
  }
  if (playerOWins > 0) {
    if (playerOName === "") {
        playerO.innerHTML = (`Player O has ${playerOWins} win`)
        } else {
            playerO.innerHTML = (`${playerOName} has ${playerOWins} win`);
        }
  }
  if (playerOWins > 1) {
    playerO.innerHTML += ('s')
  }
};

// function to change the marker based off of the current marker state
const changeMarker = () => {
  currentMarker = currentMarker === "X" ? "O" : "X";
};

// function to clear the board in case of a win or game restart
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
  document.querySelector(".change-button").innerHTML = null;
  checkBoard();
};

// function to clear the total wins for a game restart
const clearWins = () => {
    document.querySelector(".player-x").innerHTML = null;
    document.querySelector(".player-o").innerHTML = null;
    playerXWins = 0;
    playerOWins = 0;
}

// function to add a button that allows the current marker to be changed at the beginning of a game
const changeButton = () => {
    const button = document.createElement('button');
    button.innerText = 'Change first player';
    button.addEventListener('click', () => {
      changeMarker();
      playerTurn();
      document.querySelector(".change-button").innerHTML = null
    })
    document.querySelector(".change-button").appendChild(button);
}

// function that writes the current players turn to the page and changes the color based off of the current marker
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
    if (currentMarker === 'X' && playerXName != "") {
        currentPlayer.innerHTML = (`${playerXName}'s turn`);
    } else if (currentMarker === 'O' && playerXName != "") {
        currentPlayer.innerHTML = (`${playerOName}'s turn`);
    } else {
    currentPlayer.innerHTML = (`Player ${currentMarker}'s turn`);
    }
}


// function that displays the "Change first player" button only if the board is empty
const checkBoard = () => {
    if (board.toString() === ',,,,,,,,') {
        changeButton();
    } else {
        document.querySelector(".change-button").innerHTML = null;
    }
}

// function that adds text inputs and "submit" buttons for adding player name functionality
const addPlayer = () => {
    const playerX = document.createElement('input');
    playerX.type = "text";
    playerX.className = "player-x-name";
    document.querySelector(".add-player-x").appendChild(playerX);
    const playerXButton = document.createElement('button');
    playerXButton.innerText = 'Player X';
    playerXButton.addEventListener('click', () => {
      playerXName = document.querySelector(".player-x-name").value;
      document.querySelector(".add-player-x").innerHTML = `Player X: ${playerXName}`;
    })
    document.querySelector(".add-player-x").appendChild(playerXButton);


    const playerO = document.createElement('input');
    playerO.type = "text";
    playerO.className = "player-o-name";
    document.querySelector(".add-player-o").appendChild(playerO);
    const playerOButton = document.createElement('button');
    playerOButton.innerText = 'Player O';
    playerOButton.addEventListener('click', () => {
      playerOName = document.querySelector(".player-o-name").value;
      document.querySelector(".add-player-o").innerHTML = `Player O: ${playerOName}`;
    })
    document.querySelector(".add-player-o").appendChild(playerOButton);
}

// functions to be called initially to display player turn and allow for first player to be changed
playerTurn();
checkBoard();