const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let instructions = data
    .trim()
    .split("\n")
    .map((line) => line.replace(/\s/g, "").split("="))
    .map((instr) =>
      instr[0] == "mask"
        ? { type: "mask", mask: Array.from(instr[1]) }
        : {
            type: "mem",
            addr: instr[0].substring(4, instr[0].length - 1),
            val: Number(instr[1]),
          }
    );

  // Part 1
  // const applyMask = (mask, val) =>
  //   parseInt(
  //     mask
  //       .map((bit, index) =>
  //         bit == "X"
  //           ? Array.from(val.toString(2)).reverse()[35 - index] || "0"
  //           : bit
  //       )
  //       .join(""),
  //     2
  //   );

  // const finalState = instructions.reduce(
  //   (prev, instr) =>
  //     instr.type == "mask"
  //       ? { ...prev, mask: instr.mask }
  //       : {
  //           ...prev,
  //           memory: {
  //             ...prev.memory,
  //             [instr.addr]: applyMask(prev.mask, instr.val),
  //           },
  //         },
  //   { mask: "", memory: {} }
  // );
  // console.log(
  //   Object.values(finalState.memory).reduce((acc, curr) => acc + curr, 0)
  // );

  // Part 2
  // Slow and messy, but it works
  const applyMask = (mask, val) =>
    mask.map((bit, index) =>
      bit == "0"
        ? Array.from(val.toString(2)).reverse()[35 - index] || "0"
        : bit
    );

  const expand = (masked) =>
    masked.reduce(
      (prev, _) =>
        prev.reduce(
          (prev, entry) =>
            entry.includes("X")
              ? [
                  ...prev,
                  ...expand(Array.from(entry.join("").replace(/X/, "0"))),
                  ...expand(Array.from(entry.join("").replace(/X/, "1"))),
                ]
              : [...prev, entry],
          []
        ),
      [masked]
    );

  const finalState = instructions.reduce(
    (prev, instr) =>
      instr.type == "mask"
        ? { ...prev, mask: instr.mask }
        : {
            ...prev,
            memory: {
              ...prev.memory,
              ...expand(applyMask(prev.mask, Number(instr.addr))).reduce(
                (masks, bitField) => ({
                  ...masks,
                  [parseInt(bitField.join(""), 2)]: instr.val,
                }),
                {}
              ),
            },
          },
    { mask: "", memory: {} }
  );

  console.log(
    Object.values(finalState.memory).reduce((acc, curr) => acc + curr, 0)
  );
});
