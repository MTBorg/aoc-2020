const fs = require("fs");

// // Part 1
// fs.readFile("data.txt", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   let res = data
//     .trim()
//     .split(/^\s*$/gm)
//     .map((group) =>
//       group.split("\n").reduce(
//         (acc, line) => ({
//           ...acc,
//           ...Array.from(line).reduce(
//             (acc, curr) => ({ ...acc, [curr]: true }),
//             {}
//           ),
//         }),
//         {}
//       )
//     )
//     .reduce((acc, curr) => acc + Object.keys(curr).length, 0);
//   console.log(res);
// });

// Part 2
fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let res = data
    .split(/^\s*$/gm)
    .map(
      (group) =>
        Object.values(
          group.split("\n").reduce(
            (acc, line) => ({
              ...acc,
              ...Array.from(line).reduce(
                (acc2, question) => ({
                  ...acc2,
                  [question]: acc[question] != null ? acc[question] + 1 : 1,
                }),
                {}
              ),
            }),
            {}
          )
        ).filter((val) => val == group.trim().split("\n").length).length
    )
    .reduce((acc, curr) => acc + curr, 0);
  console.log(res);
});
