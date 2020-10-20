const React = require("react");
const { connect } = require("react-redux");

const MisCosas = (props) => {
  return (
    <div>
      <h2 class="athelas ph3 ph0-l">Mis canciones</h2>
      <div className="pa3 pa5-ns">
        <ul className="list pl0 measure center">
          {props.canciones.map((item) => {
            return (
              <li
                key={item.id}
                className="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30"
              >
                {item.nombre}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const App = (props) => {
  const styleContainer = {
    position: "relative",
    backgroundImage: `url("https://cdn.glitch.com/19b7d8c8-65d2-4304-ab8e-f7a2b40719ce%2Fsmartphone.png?v=1603159756329")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "700px",
  };
  const styleInner = {
    position: "absolute",
    backgroundColor: "lavender",
    top: "145px",
    left: "69px",
    height: "430px",
    width: "252px",
  };
  return (
    <div style={styleContainer}>
      <div style={styleInner}>
        <MisCosas canciones={props.canciones} />
      </div>
    </div>
  );
};

const connector = connect((state) => state);

module.exports = connector(App);

/*
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
*/
