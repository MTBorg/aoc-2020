const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let entries = data
    .trim()
    .split("\n")
    .map((line) => Array.from(line));

  // Puzzle 1
  // let x = 0,
  //   count = 0;
  // entries.forEach((_, y) => {
  //   if (entries[y][x] == "#") count++;
  //   x = (x + 3) % entries[y].length;
  // });
  // console.log(count);

  // Puzzle 2
  // imperative programming, euugh...
  const slope = (rSteps, dSteps) => {
    let x = 0,
      count = 0;
    for (let y = 0; y < entries.length; y += dSteps) {
      if (entries[y][x] == "#") count++;
      x = (x + rSteps) % entries[y].length;
    }
    return count;
  };

  const steps = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  console.log(
    steps.reduce((prev, [right, down]) => prev * slope(right, down), 1)
  );
});
