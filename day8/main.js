const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let ops = data
    .trim()
    .split("\n")
    .map((line) => ({
      instr: line.split(" ")[0],
      val: Number(line.split(" ")[1]),
    }));
  const uniqueArray = (arr) =>
    !arr.some((e1, i1) => arr.some((e2, i2) => e1 == e2 && i1 != i2));

  // Part 1
  // const exec = ({ index, acc }) =>
  //   ({
  //     jmp: { index: index + ops[index].val, acc },
  //     acc: { index: index + 1, acc: acc + ops[index].val },
  //     nop: { index: index + 1, acc },
  //   }[ops[index].instr]);
  // const initialState = { index: 0, acc: 0 };
  // let executed = [];
  // let nextState = initialState;
  // while (uniqueArray(executed)) {
  //   executed = [...executed, nextState.index];
  //   nextState = exec(nextState);
  // }
  // console.log(nextState.acc);

  // Part 2
  const exec = ({ index, acc }, ops) =>
    ({
      jmp: { index: index + ops[index].val, acc },
      acc: { index: index + 1, acc: acc + ops[index].val },
      nop: { index: index + 1, acc },
    }[ops[index].instr]);
  const initialState = { index: 0, acc: 0 };
  ops.forEach((op, index) => {
    if (op.instr != "jmp" && op.instr != "nop") return;

    let tempOps = ops.map((op) => ({ ...op })); //deep copy the operations
    tempOps[index].instr = op.instr == "jmp" ? "nop" : "jmp";
    let executed = [];
    let nextState = initialState;
    while (nextState.index != tempOps.length && uniqueArray(executed)) {
      executed = [...executed, nextState.index];
      nextState = exec(nextState, tempOps);
    }

    if (nextState.index == ops.length) {
      console.log("Found the instruction: ", { op }, " index ", index);
      console.log("Acc: ", nextState.acc);
    }
  });
});
