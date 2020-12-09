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
  //Part 1
  const preambleLength = 25;
  const isSumOfPrev = (index, arr) =>
    arr
      .slice(index - preambleLength, index)
      .some((e1, i1) =>
        arr
          .slice(index - preambleLength, index)
          .some((e2, i2) => e1 + e2 == arr[index] && i1 != i2)
      );
  const answer = res.find(
    (_, index) => !isSumOfPrev(index, res) && index >= preambleLength
  );
  console.log("answer", answer);

  //Part 2
  // I really don't like this solution...
  const contig = (index, arr, num) => {
    let sum = 0;
    let i = 0;
    let count = 0;
    do {
      sum += arr[index + i];
      i++;
      count++;
      if (sum == num && count >= 2) {
        return index + i;
      }
    } while (sum < num);
    return null;
  };
  const set = res.reduce(
    (prev, curr, index) => {
      let c = contig(index, res, answer);
      if (c) {
        return { start: index, end: c };
      } else {
        return prev;
      }
    },
    {
      start: null,
      end: null,
    }
  );
  const max = Math.max(...res.slice(set.start, set.end));
  const min = Math.min(...res.slice(set.start, set.end));
  console.log(min + max);
});
