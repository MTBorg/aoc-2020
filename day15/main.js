const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let res = data
    .split("\n")[0]
    .split(",")
    .map((number) => Number(number));

  let spoken = res;

  // Part 1
  const findLastSpoken = (spoken) => {
    let i = spoken.length - 2;
    while (spoken[i] != spoken[spoken.length - 1]) {
      i--;
    }
    return i;
  };
  const speak = (spoken) => [
    ...spoken,
    spoken.some(
      (el, index) =>
        el == spoken[spoken.length - 1] && index != spoken.length - 1
    )
      ? spoken.length - 1 - findLastSpoken(spoken)
      : 0,
  ];

  const solve = (spoken) =>
    spoken.length == 2020 ? spoken : solve(speak(spoken));
  console.log(solve(spoken)[2019]);

  // Part 2
  spoken = spoken.reduce(
    (prev, curr, index) => ({
      ...prev,
      [curr]: { turn1: index + 1, turn2: null },
      lastSpoken: curr,
    }),
    {}
  );
  console.log(spoken);
  console.log();
  let test = 0;
  for (let i = 4; i < 30000001; i++) {
    const indexDiff =
      spoken[spoken.lastSpoken].turn2 - spoken[spoken.lastSpoken].turn1;
    if (i % 1000 == 0) {
      console.log(i);
    }
    spoken = spoken[spoken.lastSpoken].turn2
      ? {
          ...spoken,
          lastSpoken: indexDiff,
          [indexDiff]: {
            ...spoken[indexDiff],
            ...(spoken[indexDiff]
              ? {
                  turn1:
                    (spoken[indexDiff] && spoken[indexDiff].turn2) ||
                    spoken[indexDiff].turn1,
                  turn2: i,
                }
              : { turn1: i, turn2: null }),
          },
        }
      : {
          ...spoken,
          lastSpoken: 0,
          [0]: spoken[0]
            ? {
                turn1: spoken[0].turn2 || spoken[0].turn1,
                turn2: i,
              }
            : { turn1: i, turn2: null },
        };
  }
  console.log(test);
  console.log(spoken.lastSpoken);
});
