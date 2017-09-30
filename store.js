const { createStore } = require('redux')

const rootReducer = (state={counter: 0}, action) => {
  switch(action.type) {
    case 'INCR':
      return { counter: state.counter + 1 }
    case 'DECR':
      return { counter: state.counter - 1 }
    default:
      return state
  }
  //return state
}

const store = createStore(rootReducer)

module.exports = store