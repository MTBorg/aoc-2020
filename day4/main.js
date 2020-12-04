const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  //Part 1
  // const requiredProps = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  // let res = data
  //   .trim()
  //   .split(/^\s*$/gm)
  //   .map((entry) => entry.trim())
  //   .map((entry) => entry.replaceAll("\n", " "))
  //   .map((entry) =>
  //     entry.split(" ").reduce(
  //       (curr, prev) => ({
  //         ...curr,
  //         [prev.split(":")[0]]: prev.split(":")[1],
  //       }),
  //       {}
  //     )
  //   )
  //   .filter((entry) => requiredProps.every((prop) => entry[prop] != null));
  // console.log(res.length);

  // Part 2
  const requiredProps = [
    [
      "byr",
      (byr) => byr.length == 4 && Number(byr) >= 1920 && Number(byr) <= 2002,
    ],
    [
      "iyr",
      (iyr) => iyr.length == 4 && Number(iyr) >= 2010 && Number(iyr) <= 2020,
    ],
    [
      "eyr",
      (eyr) => eyr.length == 4 && Number(eyr) >= 2020 && Number(eyr) <= 2030,
    ],
    [
      "hgt",
      (hgt) => {
        const metric = hgt.substring(hgt.length - 2, hgt.length);
        const val = Number(hgt.substring(0, hgt.length - 2));
        return (
          (metric == "cm" && val >= 150 && val <= 193) ||
          (metric == "in" && val >= 59 && val <= 76)
        );
      },
    ],
    ["hcl", (hcl) => hcl.match(/^#[(a-f|0-9)]{6}$/i)],
    ["ecl", (ecl) => ecl.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/)],
    ["pid", (pid) => pid.match(/^[0-9]{9}$/)],
  ];
  let res = data
    .trim()
    .split(/^\s*$/gm)
    .map((entry) => entry.trim())
    .map((entry) => entry.replaceAll("\n", " "))
    .map((entry) =>
      entry.split(" ").reduce(
        (curr, prev) => ({
          ...curr,
          [prev.split(":")[0]]: prev.split(":")[1],
        }),
        {}
      )
    )
    .filter((entry) =>
      requiredProps.every(
        ([propName, propValidate]) =>
          entry[propName] != null && propValidate(entry[propName])
      )
    );
  console.log(res.length);
});
