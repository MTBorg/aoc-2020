const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let res = data
    .trim()
    .split("\n")
    .map((line) => Number(line));

  // Part 1
  const findNext = (index) =>
    Math.min(...res.filter((el) => el > res[index] && el <= res[index] + 3));
  const chain = (index, prevChain = [0]) =>
    findNext(index) == Infinity
      ? [...prevChain, res[index], res[index] + 3]
      : chain(
          res.findIndex((el) => el == findNext(index)),
          [...prevChain, res[index]]
        );
  const calcAnswer = (chain) =>
    chain.reduce(
      (acc, curr, index) =>
        index == 0 ? acc : curr - chain[index - 1] == 1 ? acc + 1 : acc,
      0
    ) *
    chain.reduce(
      (acc, curr, index) =>
        index == 0 ? acc : curr - chain[index - 1] == 3 ? acc + 1 : acc,
      0
    );

  console.log(
    "Part 1:",
    calcAnswer(
      chain(
        res.findIndex((el) => el == Math.min(...res.filter((el) => el <= 3)))
      )
    )
  );

  // Part 2
  // Linear time
  const sorted = [...res].sort((a, b) => a - b); //Don't sort in-place
  console.log(
    "Part 2:",
    sorted.reduce(
      (prev, curr) => ({
        ...prev,
        [curr]:
          (prev[curr - 1] || 0) + (prev[curr - 2] || 0) + (prev[curr - 3] || 0),
      }),
      { 0: 1 }
    )[Math.max(...sorted)] // Print last element (max number)
  );
});
