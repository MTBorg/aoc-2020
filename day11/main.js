const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let initState = data
    .trim()
    .split("\n")
    .map((row) => Array.from(row));

  const prettyFormat = (state) => state.map((row) => row.join("")).join("\n");

  const empty = (x, y, state) => state[y][x] == "L";
  const occupied = (x, y, state) => state[y][x] == "#";
  const seatOccupied = (seat) => seat == "#";

  // Part 1
  // const adjacent = (x, y, state) => [
  //   ...(state[y - 1]
  //     ? [state[y - 1][x], state[y - 1][x - 1], state[y - 1][x + 1]]
  //     : []
  //   ).filter((el) => el),
  //   ...(state[y + 1]
  //     ? [state[y + 1][x], state[y + 1][x - 1], state[y + 1][x + 1]]
  //     : []
  //   ).filter((el) => el),
  //   ...[state[y][x - 1], state[y][x + 1]].filter((el) => el),
  // ];

  // const applyRules = (x, y, state) =>
  //   empty(x, y, state) && adjacent(x, y, state).filter(seatOccupied).length == 0
  //     ? "#"
  //     : occupied(x, y, state) &&
  //       adjacent(x, y, state).filter(seatOccupied).length >= 4
  //     ? "L"
  //     : state[y][x];

  // const nextRound = (state) =>
  //   state.map((row, y) => row.map((_, x) => applyRules(x, y, state)));

  // const run = (state) =>
  //   JSON.stringify(nextRound(state)) == JSON.stringify(state)
  //     ? state
  //     : run(nextRound(state));
  // const solve = (state) =>
  //   run(state).reduce((acc, row) => acc + row.filter(seatOccupied).length, 0);
  // console.log(solve(initState));

  // const floor = (x, y, state) => state[y][x] == ".";
  // const lookRight = (x, y, state) =>
  //   state[y][x + 1]
  //     ? !floor(x + 1, y, state)
  //       ? state[y][x + 1]
  //       : lookRight(x + 1, y, state)
  //     : ".";

  // Part 2
  // This is quite slow, but it works
  const collectRight = (x, y, state) =>
    state[y][x + 1] ? [state[y][x + 1], ...collectRight(x + 1, y, state)] : [];
  const lookRight = (x, y, state) =>
    collectRight(x, y, state).find((el) => el != ".") || ".";
  const collectLeft = (x, y, state) =>
    state[y][x - 1] ? [state[y][x - 1], ...collectLeft(x - 1, y, state)] : [];
  const lookLeft = (x, y, state) =>
    collectLeft(x, y, state).find((el) => el != ".") || ".";
  const collectDown = (x, y, state) =>
    state[y + 1] ? [state[y + 1][x], ...collectDown(x, y + 1, state)] : [];
  const lookDown = (x, y, state) =>
    collectDown(x, y, state).find((el) => el != ".") || ".";
  const collectUp = (x, y, state) =>
    state[y - 1] ? [state[y - 1][x], ...collectUp(x, y - 1, state)] : [];
  const lookUp = (x, y, state) =>
    collectUp(x, y, state).find((el) => el != ".") || ".";

  const collectUpRight = (x, y, state) =>
    state[y - 1] && state[y - 1][x + 1]
      ? [state[y - 1][x + 1], ...collectUpRight(x + 1, y - 1, state)]
      : [];
  const lookUpRight = (x, y, state) =>
    collectUpRight(x, y, state).find((el) => el != ".") || ".";

  const collectUpLeft = (x, y, state) =>
    state[y - 1] && state[y - 1][x - 1]
      ? [state[y - 1][x - 1], ...collectUpLeft(x - 1, y - 1, state)]
      : [];
  const lookUpLeft = (x, y, state) =>
    collectUpLeft(x, y, state).find((el) => el != ".") || ".";

  const collectDownRight = (x, y, state) =>
    state[y + 1] && state[y + 1][x + 1]
      ? [state[y + 1][x + 1], ...collectDownRight(x + 1, y + 1, state)]
      : [];
  const lookDownRight = (x, y, state) =>
    collectDownRight(x, y, state).find((el) => el != ".") || ".";

  const collectDownLeft = (x, y, state) =>
    state[y + 1] && state[y + 1][x - 1]
      ? [state[y + 1][x - 1], ...collectDownLeft(x - 1, y + 1, state)]
      : [];
  const lookDownLeft = (x, y, state) =>
    collectDownLeft(x, y, state).find((el) => el != ".") || ".";

  const adjacent = (x, y, state) => [
    lookUp(x, y, state),
    lookDown(x, y, state),
    lookLeft(x, y, state),
    lookRight(x, y, state),
    lookUpRight(x, y, state),
    lookUpLeft(x, y, state),
    lookDownRight(x, y, state),
    lookDownLeft(x, y, state),
  ];

  const applyRules = (x, y, state) =>
    empty(x, y, state) && adjacent(x, y, state).filter(seatOccupied).length == 0
      ? "#"
      : occupied(x, y, state) &&
        adjacent(x, y, state).filter(seatOccupied).length >= 5
      ? "L"
      : state[y][x];

  const nextRound = (state) =>
    state.map((row, y) => row.map((_, x) => applyRules(x, y, state)));

  const run = (state) =>
    JSON.stringify(nextRound(state)) == JSON.stringify(state)
      ? state
      : run(nextRound(state));
  const solve = (state) =>
    run(state).reduce((acc, row) => acc + row.filter(seatOccupied).length, 0);
  console.log(solve(initState));
});
