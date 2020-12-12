const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let res = data
    .trim()
    .split("\n")
    .map((line) => ({
      type: line.charAt(0),
      amount: Number(line.substring(1, line.length)),
    }));
  const toRadians = (degree) => (degree * Math.PI) / 180;

  // Part 1
  // const initState = { lat: 0, lon: 0, rot: 0 };
  // const applyInstruction = (instr, state) =>
  //   ({
  //     F: {
  //       ...state,
  //       lat:
  //         state.lat + instr.amount * Math.cos(toRadians(state.rot)).toFixed(0), //toFixed(0) fixes floating point errors
  //       lon:
  //         state.lon + instr.amount * Math.sin(toRadians(state.rot)).toFixed(0),
  //     },
  //     N: { ...state, lon: state.lon + instr.amount },
  //     S: { ...state, lon: state.lon - instr.amount },
  //     E: { ...state, lat: state.lat + instr.amount },
  //     W: { ...state, lat: state.lat - instr.amount },
  //     L: { ...state, rot: (state.rot + instr.amount) % 360 },
  //     R: { ...state, rot: (state.rot - instr.amount) % 360 },
  //   }[instr.type]);

  // const finalState = res.reduce(
  //   (prevState, instr) => applyInstruction(instr, prevState),
  //   initState
  // );
  // console.log(Math.abs(finalState.lat) + Math.abs(finalState.lon));

  // Part 2
  const initState = {
    ship: { lat: 0, lon: 0 },
    waypoint: { lat: 10, lon: 1 },
  };
  const applyInstruction = (instr, state) =>
    ({
      N: {
        ...state,
        waypoint: { ...state.waypoint, lon: state.waypoint.lon + instr.amount },
      },
      S: {
        ...state,
        waypoint: { ...state.waypoint, lon: state.waypoint.lon - instr.amount },
      },
      W: {
        ...state,
        waypoint: { ...state.waypoint, lat: state.waypoint.lat - instr.amount },
      },
      E: {
        ...state,
        waypoint: { ...state.waypoint, lat: state.waypoint.lat + instr.amount },
      },
      F: {
        ship: {
          lat:
            state.ship.lat +
            (state.waypoint.lat - state.ship.lat) * instr.amount,
          lon:
            state.ship.lon +
            (state.waypoint.lon - state.ship.lon) * instr.amount,
        },
        waypoint: {
          lat:
            state.ship.lat +
            (state.waypoint.lat - state.ship.lat) * (instr.amount + 1),
          lon:
            state.ship.lon +
            (state.waypoint.lon - state.ship.lon) * (instr.amount + 1),
        },
      },
      R: {
        ...state,
        waypoint: {
          lat:
            (state.waypoint.lat - state.ship.lat) *
              Math.cos(toRadians(-instr.amount)) -
            (state.waypoint.lon - state.ship.lon) *
              Math.sin(toRadians(-instr.amount)) +
            state.ship.lat,
          lon:
            (state.waypoint.lat - state.ship.lat) *
              Math.sin(toRadians(-instr.amount)) +
            (state.waypoint.lon - state.ship.lon) *
              Math.cos(toRadians(-instr.amount)) +
            state.ship.lon,
        },
      },
      L: {
        ...state,
        waypoint: {
          lat:
            (state.waypoint.lat - state.ship.lat) *
              Math.cos(toRadians(instr.amount)) -
            (state.waypoint.lon - state.ship.lon) *
              Math.sin(toRadians(instr.amount)) +
            state.ship.lat,
          lon:
            (state.waypoint.lat - state.ship.lat) *
              Math.sin(toRadians(instr.amount)) +
            (state.waypoint.lon - state.ship.lon) *
              Math.cos(toRadians(instr.amount)) +
            state.ship.lon,
        },
      },
    }[instr.type]);

  const finalState = res.reduce(
    (prevState, instr) => applyInstruction(instr, prevState),
    initState
  );
  console.log(Math.abs(finalState.ship.lat) + Math.abs(finalState.ship.lon));
});
