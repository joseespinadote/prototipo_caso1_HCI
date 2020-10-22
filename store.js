const { createStore } = require("redux");
const initialState = {
  canciones: [],
  otrasCanciones: [
    {
      nombre: "cueca 1",
      autor: "paloma mami",
      pistas: [
        {
          nombre: "pista2",
          icono:
            "https://cdn.glitch.com/19b7d8c8-65d2-4304-ab8e-f7a2b40719ce%2Fkeyboard_icon.png?v=1603311389334",
        },
        {
          nombre: "pista1",
          icono:
            "https://cdn.glitch.com/19b7d8c8-65d2-4304-ab8e-f7a2b40719ce%2Ficono.png?v=1603311389277",
        },
      ],
    },
    {
      nombre: "vaca lola",
      autor: "jana montana",
      pistas: [
        {
          nombre: "pista2",
          icono:
            "https://cdn.glitch.com/19b7d8c8-65d2-4304-ab8e-f7a2b40719ce%2Fkeyboard_icon.png?v=1603311389334",
        },
        {
          nombre: "pista1",
          icono:
            "https://cdn.glitch.com/19b7d8c8-65d2-4304-ab8e-f7a2b40719ce%2Ficono.png?v=1603311389277",
        },
      ],
    },
  ],
  grupos: [],
  cancionActual: null,
  pistaActual: null,
  modo: "Bienvenida",
  sesion: null,
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TRACK_NAME":
      return {
        ...state,
        pistaActual: { ...state.pistaActual, nombre: action.value },
      };
    case "SET_TRACK_ICON":
      return {
        ...state,
        pistaActual: { ...state.pistaActual, icono: action.value },
      };
    case "SAVE_TRACK":
      return {
        ...state,
        modo: action.modo,
        cancionActual: {
          ...state.cancionActual,
          pistas: [state.pistaActual, ...state.cancionActual.pistas],
        },
        canciones: state.canciones.map((item) => {
          if (item.nombre == state.cancionActual.nombre)
            return {
              ...state.cancionActual,
              pistas: [state.pistaActual, ...state.cancionActual.pistas],
            };
          return item;
        }),
      };
    case "NEW_TRACK":
      return {
        ...state,
        modo: action.modo,
        pistaActual: { nombre: "", icono: "" },
      };
    case "NEW_SONG":
      return {
        ...state,
        canciones: [action.nuevaCancion, ...state.canciones],
        modo: action.modo,
        cancionActual: action.nuevaCancion,
      };
    case "CLONE_SONG":
      return {
        ...state,
        canciones: [action.copia, ...state.canciones],
        modo: action.modo,
      };
    case "SELECT_SONG":
      return { ...state, cancionActual: action.cancion, modo: action.modo };
    case "SELECT_TRACK":
      return { ...state, pistaActual: action.pista, modo: action.modo };
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
