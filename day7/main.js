const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let res = data
    .trim()
    .split("\n")
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr.split(" ").slice(0, 2).join(" ")]: {
          ...curr
            .split(" ")
            .slice(4)
            .join(" ")
            .split(",")
            .map((line) => line.trim())
            .reduce(
              (prev, curr) => ({
                ...prev,
                ...(curr == "no other bags." // Ugly workaround
                  ? {}
                  : {
                      [curr
                        .split(" ")
                        .slice(1, curr.split(" ").length - 1)
                        .join(" ")]: curr.split(" ")[0],
                    }),
              }),
              {}
            ),
        },
      }),
      {}
    );

  // Part 1
  const canHold = (holder, bag) =>
    Object.keys(res[holder]).some((key) => key == bag) ||
    Object.keys(res[holder]).some((key) => canHold(key, bag));
  console.log(
    Object.keys(res).filter((key) => canHold(key, "shiny gold")).length
  );

  // Part 2
  const count = (bag) =>
    Object.entries(res[bag]).reduce(
      (acc, curr) => acc + Number(curr[1]) * (count(curr[0]) + 1),
      0
    );
  console.log(count("shiny gold"));
});
