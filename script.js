let turn = 1;
let playground = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

function isFieldTaken(row, col) {
  return Boolean(playground[row][col]);
}

const allEqual = (arr) => arr.every((val) => val === arr[0]);

function isSolved(board) {
  const lines = board.concat(
    board[0].map((_, colIndex) => board.map((row) => row[colIndex]))
  );

  lines.push([board[0][2], board[1][1], board[2][0]]);
  lines.push([board[0][0], board[1][1], board[2][2]]);

  for (let i = 0; i < lines.length; i++) {
    if (allEqual(lines[i])) {
      if (!lines[i][0]) continue;
      return lines[i][0];
    }
  }

  return board.reduce((acc, val) => [...acc, ...val], []).filter((t) => !t)
    .length
    ? -1
    : 0;

  // 1 - first player wins
  // 2 - second player wins
  // 0 - a tie
  // -1 - the game is not over
}

function markField(row, col) {
  const symbol = turn === 1 ? "crest" : "circle";
  const field = document.querySelector(
    `[data-row="${row}"][data-col="${col}"]`
  );
  field.classList.add("taken", symbol);

  playground[row][col] = turn;

  turn = turn === 1 ? 2 : 1;
}

function reset() {
  playground = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  turn = 1;
  const fields = document.querySelectorAll(".field");
  fields.forEach((f) => {
    f.classList.remove(...["crest", "circle", "taken"]);
  });
}

function onMove(event) {
  const { row, col } = event.target.dataset;

  if (isFieldTaken(row, col)) {
    alert("Field is taken. Please, choose free field for your move");
    return;
  }

  markField(row, col);

  const solved = isSolved(playground);

  if (solved === -1) {
  } else if (solved === 0) {
    setTimeout(() => {
      alert("It's a draw!");
      reset();
    }, 100);
  } else if (solved) {
    setTimeout(() => {
      alert(`Player ${solved} wins!`);
      reset();
    }, 100);
  }
}
