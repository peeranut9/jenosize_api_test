import checkWinner from "./checkWinner.js";
export default (board) => {
  if (board[1][1] === "") {
    return { row: 1, col: 1 };
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        board[i][j] = "O";
        if (checkWinner(board) === "O") {
          return { row: i, col: j };
        }
        board[i][j] = "";
      }
    }
  }
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!board[i][j]) {
        board[i][j] = "X";
        if (checkWinner(board) === "X") {
          board[i][j] = "O";
          return { row: i, col: j };
        }
        board[i][j] = "";
      }
    }
  }
  const emptySquares = [];
  const listPlayerCross = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        emptySquares.push({ row: i, col: j });
      } else if (board[i][j] === "X" && (i == 1 || j == 1)) {
        listPlayerCross.push({ row: i, col: j });
      }
    }
  }

  const connerList = emptySquares.filter(
    (e) => [0, 2].includes(e.row) && [0, 2].includes(e.col)
  );
  if (board[1][1] === "O" && listPlayerCross.length < 2) {
    const crossList = emptySquares.filter((e) => e.row == 1 || e.col == 1);
    if (crossList.length > 0) {
      const randomIndex = Math.floor(Math.random() * crossList.length);
      return { ...crossList[randomIndex] };
    }
  }
  if (connerList.length > 0) {
    const randomIndex = Math.floor(Math.random() * connerList.length);
    return { ...connerList[randomIndex] };
  }
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return { ...emptySquares[randomIndex] };
};
