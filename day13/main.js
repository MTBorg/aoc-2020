const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let departure = Number(data.split("\n")[0]);
  let busses = data.split("\n")[1].split(",");

  // Part 1
  const earliest = busses
    .filter((bus) => bus != "x")
    .map((busId) => ({
      id: busId,
      val: busId - (departure % busId),
    }))
    .sort((b1, b2) => (b1.val < b2.val ? -1 : 1))[0];
  console.log("Answer p1:", earliest.id * earliest.val);

  // Part 2
  // Use the same idea as:
  // https://www.reddit.com/r/adventofcode/comments/kcl7d2/2020_day_13_part_2_buses_in_a_slot_machine/
  busses = busses.reduce(
    (prev, bus, index) =>
      bus != "x" ? [...prev, { id: Number(bus), index }] : prev,
    []
  );

  console.log(
    "Answer p2:",
    busses.reduce(
      (prev, _, index) => {
        let temp = prev.timestamp;
        if (index == busses.length - 1) {
          return prev;
        }
        while ((temp + busses[index + 1].index) % busses[index + 1].id != 0) {
          temp += prev.step;
        }
        return {
          timestamp: temp,
          step: prev.step * busses[index + 1].id,
        };
      },
      {
        timestamp: 0,
        step: busses[0].id,
      }
    ).timestamp
  );
});
