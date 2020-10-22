const { createStore } = require("redux");
const initialState = {
  canciones: [],
  grupos: null,
  cancionActual: null,
  modo: "Bienvenida",
  sesion: null,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_SONG":
      return {
        ...state,
        canciones: [action.nuevaCancion, ...state.canciones],
        modo: action.modo,
        cancionActual: action.nuevaCancion,
      };
    case "SELECT_SONG":
      return { ...state, cancionActual: action.cancion, modo: action.modo };
    case "CHANGE_MODE":
      return { ...state, modo: action.modo };
    case "LOGIN_LOGOUT":
      return { ...state, sesion: action.sesion, modo: action.modo };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

module.exports = store;
