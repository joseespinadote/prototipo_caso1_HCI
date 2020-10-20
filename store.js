const { createStore } = require("redux");
const initialState = {
  counter: 0,
  canciones: [
    { id: 1, nombre: "cancion1" },
    { id: 2, nombre: "cancion2" },
    { id: 3, nombre: "cancion3" },
  ],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCR":
      return { counter: state.counter + 1 };
    case "DECR":
      return { counter: state.counter - 1 };
    default:
      return state;
  }
  //return state
};

const store = createStore(rootReducer);

module.exports = store;
