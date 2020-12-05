const fs = require("fs");

// // Part 1
// fs.readFile("data.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   let res = data
//     .trim()
//     .split("\n")
//     .map((line) => ({
//       row: Array.from(line.slice(0, 7)).reduce(
//         (acc, curr, index) => (curr == "B" ? acc + 2 ** (6 - index) : acc),
//         0
//       ),
//       column: Array.from(line.slice(7)).reduce(
//         (acc, curr, index) => (curr == "R" ? acc + 2 ** (2 - index) : acc),
//         0
//       ),
//     }))
//     .map((entry) => entry.row * 8 + entry.column)
//     .reduce((prev, curr) => Math.max(prev, curr), 0);
//   console.log(res);

// Part 2
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let res = data
    .trim()
    .split("\n")
    .map((line) => ({
      row: Array.from(line.slice(0, 7)).reduce(
        (acc, curr, index) => (curr == "B" ? acc + 2 ** (6 - index) : acc),
        0
      ),
      column: Array.from(line.slice(7)).reduce(
        (acc, curr, index) => (curr == "R" ? acc + 2 ** (2 - index) : acc),
        0
      ),
    }))
    .map((entry) => entry.row * 8 + entry.column);

  const solution =
    res.find((id1) =>
      res.some((id2) => id2 == id1 - 2 && !res.some((id3) => id3 == id1 - 1))
    ) - 1;
  console.log(solution);
});
