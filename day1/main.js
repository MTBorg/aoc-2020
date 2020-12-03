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

  // Calculate all permutations of length n
  // Not terribly efficient...
  const nPerm = (elements, n) =>
    n == 1
      ? elements.map((e) => [e])
      : elements
          .map((e, index) =>
            nPerm(elements.slice(index + 1), n - 1).map((perms) => [
              e,
              ...perms,
            ])
          )
          .flat(1);

  // Find the correct permutation
  const permutations = nPerm(res, 3);
  const solution = permutations
    .find(
      (permutation) => permutation.reduce((acc, curr) => acc + curr, 0) == 2020
    )
    .reduce((acc, curr) => acc * curr, 1);
  console.log(solution);
});
