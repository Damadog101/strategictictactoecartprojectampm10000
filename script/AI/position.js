import Board from "./position/board.js";
import { hash } from "./transposition.js";

class Position {
  /**
   * The position class is a representation of a Strategic-Tic-Tac-Toe board that is optimized for
   * number crunching. All boards are reprsented in binary, including a list of which boards are still in play and which boards have been won.
   * The player value is represented as 0 and 1.
   *
   * @param {Position} P
   * If passed in, the constructor will clone the given Position instead of making a new one. Optional.
   * @returns {Position}
   */
  constructor(P) {
    if (P) {
      this.subboards = [];
      for (let i = 0; i < 9; i++) {
        this.subboards[i] = P.subboards[i].clone();
      }
      this.board = P.board.clone();
      this.subboard = P.subboard;
      this.legalBoards = P.legalBoards;
      this.player = P.player;
      return;
    }

    this.subboards = new Array(9).fill(null).map((_) => new Board());
    this.legalBoards = 0b111111111;
    this.subboard = null;
    this.player = 0;
    this.board = new Board();
  }

  /**
   * Makes a move on a position
   *
   * @param {Integer} s
   * The subboard to play on
   * @param {Integer} i
   * The index to play on
   */
  move(s, i) {
    s = this.subboard || s;
    let p = this.player;
    let r1 = this.subboards[s].move(i, p);
    if (r1) {
      if (r1 == 1) {
        this.board.move(s, p);
      }
      this.legalBoards = this.legalBoards & ~(0b1 << s);
    }
    this.player = 1 - this.player;
    let mask = 0b1 << i;
    this.subboard = (this.legalBoards & mask) == mask ? i : null;
  }

  /**
   * Returns the current evaluation of a position
   * Will be positive if player 1 is winning, and negative if player 2 is winning.
   *
   * @returns
   */
  score() {
    let score = 0;

    for (let i = 0; i < 9; i++) {
      score += this.subboards[i].score();
    }

    score += this.board.score() * 10;
    return score;
  }

  /**
   * Checks if a given move is legal
   *
   * @param {Integer} s
   * The subboard of the move to check
   * @param {Integer} i
   * The index of the move to check
   * @returns
   * If the provided move is a legal one
   */
  canPlay(s, i) {
    if ((this.legalBoards & (0b1 << s)) == 0) {
      return false;
    }
    if (!this.subboards[s].canPlay(i)) {
      return false;
    }
    return true;
  }

  /**
   * Fetches all the legal moves in a position
   *
   * @returns {[[subboard, index], ...[]]}
   */
  getLegalMoves() {
    let moves = [];
    let start = this.subboard != null ? this.subboard : 0;
    let end = this.subboard != null ? this.subboard + 1 : 9;

    for (let s = start; s < end; s++) {
      for (let i = 0; i < 9; i++) {
        if (this.canPlay(s, i)) {
          moves.push([s, i]);
        }
      }
    }

    return moves;
  }

  /**
   * Fetches the hash of a position
   *
   * @returns
   * The hash of a position
   */
  hash() {
    return hash(this);
  }
}

export default Position;
