const React = require('react')
const { connect } = require('react-redux')

const App = props => {
  return (
    <div>
      <h1 className="pa4 blue bg-yellow">React/Redux Counter Example</h1>
      <main className="pa4">
        <div className="center tc">
        <button onClick={e => props.dispatch({type:'INCR'})}>Increment</button>
        <button onClick={e => props.dispatch({type: 'DECR'})}>Decrement</button>
        </div>
        <div className="mw5 center mt3 ba br2 tc pv3 f2">
          {props.counter}
        </div>
        <hr />
        <a href="https://glitch.com/edit/#!/react-redux-counter#README.md">
          <img src="https://img.shields.io/badge/glitch-remix-green.svg" />
        </a>
      </main>
    </div>
    
  )
}

const connector = connect(state => state)

module.exports = connector(App)