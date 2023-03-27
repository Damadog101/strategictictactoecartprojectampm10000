import Position from "./position.js";
// import { TranspositionTable, hash } from "./transposition.js";

/**
 * Returns a list of all legal moves in a position, sorted by how promising they are.
 * How promising they are is equal to their evaluation at a depth of 1.
 *
 * @param {Position} P
 * The position to get ordered moves for
 * @returns {[[subboard, index],...[subboard, index]]}
 */
function getOrderedMoves(P) {
  let moves = P.getLegalMoves();
  let player = P.player == 0 ? 1 : -1;

  moves = moves.map((move) => {
    let P2 = new Position(P);
    P2.move(move[0], move[1]);
    return [P2.score() * player, move];
  });

  return moves.sort((a, b) => b[0] - a[0]);
}

/**
 * Evalutates how good a Position is relative to whose turn it is to play.
 *
 * @param {Position} P
 * The position to be evaluated.
 *
 * @param {number} depth
 * The depth the search is currently at.
 *
 * @param {number} alpha
 * The current guaranteed best value for player 1. Default -Infinity.
 *
 * @param {number} beta
 * The current guaranteed best value for player 2. Default +Infinity.
 *
 * @returns {number}
 * A score for who is most winning in the given postiion. Value will be positive if player 1 is winning, and negative if player 2 is winning.
 */
function minimax(P, depth, alpha = -Infinity, beta = Infinity) {
  let board = P.board;
  let player = P.player;

  if (board.checkWin(board.boards[player])) {
    let sign = player == 1 ? -1 : 1;
    return 1_000_000 * sign;
  }

  if (P.legalBoards == 0) {
    return 0;
  }

  if (depth == 0) {
    return P.score();
  }

  let bestScore = player == 0 ? -Infinity : Infinity;
  let moves = getOrderedMoves(P);

  for (let i = 0; i < moves.length; i++) {
    let move = moves[i][1];
    let subboard = P.subboards[move[0]];

    if (!subboard.canPlay(move[1])) {
      continue;
    }

    let P2 = new Position(P);
    P2.move(move[0], move[1]);
    let score = minimax(P2, depth - 1, alpha, beta);

    if (player == 0) {
      bestScore = Math.max(score, bestScore);
      alpha = Math.max(bestScore, alpha);
    } else {
      bestScore = Math.min(score, bestScore);
      beta = Math.min(bestScore, beta);
    }

    if (beta <= alpha) {
      break;
    }
  }

  return bestScore;
}

/**
 * Solves a position to a given depth, and returns the best move
 *
 * @param {Position} P
 * The position to be solved
 * @param {number} depth
 * The depth to search the move tree. Will only accept values greater than 0.
 * @returns {[subboard, index]}
 */
function solve(P, depth) {
  if (typeof depth != "number" || depth <= 0) {
    throw new Error("Input depth must be a value greater than or equal to 1");
  }

  let start = performance.now();
  let moves = getOrderedMoves(P);
  let player = P.player;

  let bestScore = player == 0 ? -Infinity : Infinity;
  let bestMove = null;

  for (let i = 0; i < moves.length; i++) {
    let move = moves[i][1];
    let P2 = new Position(P);
    P2.move(move[0], move[1]);
    let score = minimax(P2, depth - 1);

    if (
      (player == 0 && score > bestScore) ||
      (player == 1 && score < bestScore)
    ) {
      bestScore = score;
      bestMove = move;
    }
  }

  console.log(`Solve time: ${performance.now() - start}ms`);

  return bestMove;
}

/**
 *
 * @param {1 | -1} n
 * The number to convert
 * @returns
 */
function toBin(n) {
  return n == -1 ? 1 : 0;
}

/**
 * Converts a StrategicBoard type to a Position type
 *
 * @param {StrategicBoard} sb
 * The StrategicBoard type to be converted
 * @returns
 */
function strategicBoardToPosition(sb) {
  let P = new Position();

  sb.subboards.forEach((subboard, s) => {
    let board = subboard.board.board;

    board.forEach((p, i) => {
      if (p == 0) {
        return;
      }
      p = toBin(p);

      P.subboards[s].move(i, p);
    });
  });

  sb.board.board.forEach((p, i) => {
    if (p == 0) {
      return;
    }
    p = toBin(p);

    P.board.move(i, p);
    P.legalBoards = P.legalBoards & ~(0b1 << i);
  });

  P.player = toBin(sb.player);
  P.subboard = sb.subboard;

  return P;
}

export { solve, strategicBoardToPosition };
