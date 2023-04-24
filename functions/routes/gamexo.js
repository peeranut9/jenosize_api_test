import { Router } from "express";
const router = Router();
import { checkWinner, botMove } from "../functions/index.js";
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
const playerMark = "X";
const botMark = "O";

const clearBoard = () => {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
};

router.get("/", function (req, res) {
  clearBoard();
  res.status(200).send({ board });
});

router.post("/move", function (req, res) {
  try {
    const winnerBeforeMove = checkWinner(board);
    if (winnerBeforeMove) {
      clearBoard();
      return res.send({ board });
    }
    const { row, col } = req.body;
    const rowMove = parseInt(row);
    const colMove = parseInt(col);
    //TODO:use yup to validate later
    if (Number.isNaN(rowMove) || Number.isNaN(colMove)) {
      return res.status(400).send("row and col must be integer.");
    }
    if (rowMove < 0 || rowMove > 2 || colMove < 0 || colMove > 2) {
      return res.status(400).send("row and col should be 0 - 2.");
    }

    if (board[rowMove][colMove] !== "") {
      return res
        .status(422)
        .send(
          `This square is already occupied. Please choose a different square.`
        );
    }
    board[rowMove][colMove] = playerMark;
    const winner = checkWinner(board);
    if (winner) {
      return res.send({ board, winner });
    } else {
      const bot = botMove(board);
      board[bot.row][bot.col] = botMark;
      const winner = checkWinner(board);
      if (winner) {
        return res.send({ board, winner });
      } else {
        return res.send({ board });
      }
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default router;
