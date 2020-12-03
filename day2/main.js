const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Puzzle 1
  // let entries = data
  //   .trim()
  //   .split("\n")
  //   .map((line) => line.split(" "))
  //   .map((fields) => ({
  //     min: fields[0].split("-")[0],
  //     max: fields[0].split("-")[1],
  //     char: fields[1].charAt(0),
  //     password: fields[2],
  //   }));

  // console.log(
  //   entries.filter((entry) => {
  //     const charCount = Array.from(entry.password).filter(
  //       (char) => char == entry.char
  //     ).length;
  //     return charCount >= entry.min && charCount <= entry.max;
  //   }).length
  // );

  // Puzzle 2
  let entries = data
    .trim()
    .split("\n")
    .map((line) => line.split(" "))
    .map((fields) => ({
      first: fields[0].split("-")[0],
      second: fields[0].split("-")[1],
      char: fields[1].charAt(0),
      password: fields[2],
    }));

  console.log(
    entries.filter((entry) => {
      const first = entry.password.charAt(entry.first - 1) == entry.char;
      const second = entry.password.charAt(entry.second - 1) == entry.char;
      return (first && !second) || (!first && second);
    }).length
  );
});
