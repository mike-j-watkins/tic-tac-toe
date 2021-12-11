"use strict";

const gameBoard = {
  init: function () {
    this.refreshGameboard();
  },
  refreshGameboard: function () {
    this.currentBoard = ["", "", "", "", "", "", "", "", ""];
    this.squares.forEach((square) => (square.innerHTML = ""));
  },
  cacheDom: function () {
    this.boardDisplay = document.querySelector(".board");
    this.squares = document.querySelectorAll(".column");
    this.startButton = document.querySelector(".btn-start");
    this.restartButton = document.querySelector(".btn-restart");
  },
  checkWin: function () {
    if (
      (this.currentBoard[0] == this.currentBoard[1] &&
        this.currentBoard[0] == this.currentBoard[2] &&
        this.currentBoard[0] == game.currentPlayer.token) ||
      (this.currentBoard[3] == this.currentBoard[4] &&
        this.currentBoard[3] == this.currentBoard[5] &&
        this.currentBoard[3] == game.currentPlayer.token) ||
      (this.currentBoard[3] == this.currentBoard[4] &&
        this.currentBoard[3] == this.currentBoard[5] &&
        this.currentBoard[3] == game.currentPlayer.token) ||
      (this.currentBoard[6] == this.currentBoard[7] &&
        this.currentBoard[6] == this.currentBoard[8] &&
        this.currentBoard[6] == game.currentPlayer.token) ||
      (this.currentBoard[0] == this.currentBoard[4] &&
        this.currentBoard[0] == this.currentBoard[8] &&
        this.currentBoard[0] == game.currentPlayer.token) ||
      (this.currentBoard[2] == this.currentBoard[4] &&
        this.currentBoard[2] == this.currentBoard[6] &&
        this.currentBoard[2] == game.currentPlayer.token) ||
      (this.currentBoard[0] == this.currentBoard[3] &&
        this.currentBoard[0] == this.currentBoard[6] &&
        this.currentBoard[0] == game.currentPlayer.token) ||
      (this.currentBoard[1] == this.currentBoard[4] &&
        this.currentBoard[1] == this.currentBoard[7] &&
        this.currentBoard[1] == game.currentPlayer.token) ||
      (this.currentBoard[2] == this.currentBoard[5] &&
        this.currentBoard[2] == this.currentBoard[8] &&
        this.currentBoard[2] == game.currentPlayer.token)
    ) {
      return "win";
    } else {
      let squaresArr = Array.from(this.squares);

      if (squaresArr.every((square) => square.innerHTML != "")) {
        return "draw";
      }
    }
  },
};

const game = {
  init: function () {
    this.player1 = this.makePlayer(prompt("Insert name for player 1: "), "x");
    this.player2 = this.makePlayer(prompt("Insert name for player 2: "), "o");
    this.isPlaying = true;
    this.currentPlayer = this.player1;
    this.winner.innerHTML = "&nbsp;";
  },
  changePlayer: function () {
    if (this.currentPlayer == this.player1) {
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
  },
  cacheDom: function () {
    this.winner = document.querySelector(".win");
  },
  makePlayer: (name, token) => {
    return { name, token };
  },
  winState: function (winWord) {
    // winWord will be return value from gameBoard.checkWin()
    if (!winWord) return;

    if (winWord == "win") {
      this.winner.innerHTML = `${game.currentPlayer.name} gone done won!`;
      game.isPlaying = false;
    }
    if (winWord == "draw") {
      this.winner.innerHTML = "draw";
      game.isPlaying = false;
    }
  },
  restart: function () {
    this.currentPlayer = this.player1;
    this.isPlaying = true;
    this.winner.innerHTML = "&nbsp;";
  },
};

gameBoard.cacheDom();
game.cacheDom();

gameBoard.boardDisplay.addEventListener("click", function (e) {
  if (!e.target.innerHTML == "") return;

  if (game.isPlaying) {
    e.target.innerHTML = game.currentPlayer.token;

    gameBoard.currentBoard.splice(
      e.target.dataset.number,
      1,
      game.currentPlayer.token
    );

    let winStatus = gameBoard.checkWin();
    game.winState(winStatus);

    game.changePlayer();
  }
});

gameBoard.startButton.addEventListener("click", function () {
  game.init();
  gameBoard.init();
});

gameBoard.restartButton.addEventListener("click", function (e) {
  if (!game.player1) return;

  gameBoard.refreshGameboard();
  game.restart();
});
