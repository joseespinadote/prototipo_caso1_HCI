const React = require("react");
const { connect } = require("react-redux");

const MenuSuperior = (props) => {
  const cierraMenu = () => {
    document.getElementById("mySidenav").style.width = "0";
  };
  const abreMenu = () => {
    document.getElementById("mySidenav").style.width = "200px";
  };
  const styleMenu = {
    height: "45px",
  };
  const styleSideNav = {
    height: "330px",
    width: "0",
    position: "absolute",
    zIndex: "1",
    top: "0",
    left: "0",
    backgroundColor: "lightblue",
    overflowX: "hidden",
    paddingTop: "30px",
    transition: "0.5s",
  };
  const styleCloseBtn = {
    position: "absolute",
    top: "0",
    right: "10px",
    fontSize: "20px",
    marginLeft: "50px",
  };
  return (
    <div>
      <div id="mySidenav" style={styleSideNav}>
        <a
          style={styleCloseBtn}
          onClick={() => {
            cierraMenu();
          }}
        >
          &times;
        </a>
        {props.sesion ? (
          <ul className="list-group">
            <li className="list-group-item">Hola {props.sesion.nombre}</li>
            <li
              className="list-group-item list-group-item-action"
              onClick={() => {
                props.dispatcher({ type: "CHANGE_MODE", modo: "Mi perfil" });
                cierraMenu();
              }}
            >
              Mi perfil
            </li>
            <li
              className="list-group-item list-group-item-action"
              onClick={() => {
                props.dispatcher({ type: "CHANGE_MODE", modo: "Exploración" });
                cierraMenu();
              }}
            >
              Explorar
            </li>
            <li
              className="list-group-item list-group-item-action"
              onClick={() => {
                props.dispatcher({
                  type: "CHANGE_MODE",
                  modo: "Mis canciones",
                });
                cierraMenu();
              }}
            >
              Mis canciones
            </li>
            <li
              className="list-group-item list-group-item-action"
              onClick={() => {
                props.dispatcher({ type: "CHANGE_MODE", modo: "Mis grupos" });
                cierraMenu();
              }}
            >
              Mis grupos
            </li>
            <li
              className="list-group-item list-group-item-action"
              onClick={() => {
                props.dispatcher({
                  sesion: null,
                  type: "LOGIN_LOGOUT",
                  modo: "Bienvenida",
                });
                cierraMenu();
              }}
            >
              Cerrar sesión
            </li>
          </ul>
        ) : (
          <ul className="list-group">
            <li
              className="list-group-item list-group-item-action"
              onClick={() => {
                props.dispatcher({
                  type: "CHANGE_MODE",
                  modo: "Inicia sesión",
                });
                cierraMenu();
              }}
            >
              Iniciar sesión
            </li>
          </ul>
        )}
      </div>
      <div className="p-2 bg-primary text-white" style={styleMenu}>
        <span className="ml-2 font-weight-bold">MusicHub</span>
        <div className="float-right">
          <img
            src="https://cdn.glitch.com/19b7d8c8-65d2-4304-ab8e-f7a2b40719ce%2Fmenu.png?v=1603311389171"
            width="30px"
            onClick={() => {
              abreMenu();
            }}
          />
        </div>
      </div>
    </div>
  );
};

const Cancion = (props) => {
  return <pre>{JSON.stringify(props.cancion)}</pre>;
};
const NuevaCancion = (props) => {
  var nombreCancion = "";
  return (
    <form className="m-2">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">
          Ingresa el nombre de tu nueva canción
        </label>
        <input
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          onChange={(e) => {
            nombreCancion = e.target.value;
          }}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Ingresa tu contraseña</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          props.dispatcher({
            type: "NEW_SONG",
            nuevaCancion: { nombre: nombreCancion },
            modo: "Cancionando",
          });
        }}
      >
        Crear canción
      </button>
    </form>
  );
};
const MiResumen = (props) => {
  return (
    <div>
      <h3>¡Hola {props.sesion.nombre}!</h3>
      <ul className="list-group">
        <li
          className="list-group-item list-group-item-action"
          onClick={() => {
            alert("Aun no programado");
          }}
        >
          9 personas vieron tu perfil
        </li>
        <li
          className="list-group-item list-group-item-action"
          onClick={() => {
            alert("Aun no programado");
          }}
        >
          Tienes 2 solicitudes de colaboración
        </li>
        <li
          className="list-group-item list-group-item-action"
          onClick={() => {
            alert("Aun no programado");
          }}
        >
          Otras noticias irían aqui...
        </li>
      </ul>
      <h4>Mis últimas canciones</h4>
      {props.canciones.length > 0 ? (
        <ul>
          {props.canciones.slice(-2).map((item, index) => {
            return <li key={index}>{item.nombre}</li>;
          })}
        </ul>
      ) : (
        <div className="text-center">
          No tienes canciones :-({" "}
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              props.dispatcher({ type: "CHANGE_MODE", modo: "Nueva canción" });
            }}
          >
            ¡Compone tu primera canción ahora!
          </button>
        </div>
      )}
      <h4>Mis grupos recientes</h4>
      Esta funcionalidad no está programada aún
    </div>
  );
};

const MisCanciones = (props) => {
  return (
    <div>
      <h3>Mis canciones</h3>
      {props.canciones.length > 0 ? (
        <div>
          <form>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Buscar (no funciona)"
              />
            </div>
          </form>
          <ul className="list-group">
            {props.canciones.map((item, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item"
                  onClick={() => {
                    props.dispatcher({
                      type: "SELECT_SONG",
                      cancion: item,
                      modo: "Cancionando",
                    });
                  }}
                >
                  {item.nombre}
                </li>
              );
            })}{" "}
          </ul>
        </div>
      ) : (
        <div>
          <h4>No tienes canciones :-(</h4>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              props.dispatcher({ type: "CHANGE_MODE", modo: "Nueva canción" });
            }}
          >
            ¡Compone tu primera canción ahora!
          </button>
        </div>
      )}
    </div>
  );
};

const App = (props) => {
  var nombreUsuario = "";
  const styleContainer = {
    position: "relative",
    backgroundImage: `url("https://cdn.glitch.com/19b7d8c8-65d2-4304-ab8e-f7a2b40719ce%2Fsmartphone.png?v=1603159756329")`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    height: "700px",
    fontFamily: `"Gill Sans", sans-serif`,
  };
  const styleInner = {
    cursor: "pointer",
    position: "absolute",
    backgroundColor: "lavender",
    top: "145px",
    left: "69px",
    height: "430px",
    width: "252px",
    overflowY: "auto",
  };
  return (
    <div style={styleContainer}>
      <div className="float-right">
        <pre>{JSON.stringify(props, null, 2)}</pre>
      </div>
      <div style={styleInner} className="hide-scrollbar">
        <MenuSuperior sesion={props.sesion} dispatcher={props.dispatch} />
        {props.modo == "Inicia sesión" && (
          <form className="m-2">
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Ingresa tu usuario o correo electrónico
              </label>
              <input
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  nombreUsuario = e.target.value;
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                Ingresa tu contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                props.dispatch({
                  type: "LOGIN_LOGOUT",
                  sesion: { nombre: nombreUsuario },
                  modo: "Mi resumen",
                });
              }}
            >
              Iniciar sesión
            </button>
            <br />
            <br />
            <button
              className="btn btn-secondary"
              onClick={() => {
                alert("No implementado ;)");
              }}
            >
              Olvidé mi contraseña
            </button>
          </form>
        )}
        {props.modo == "Mi resumen" && (
          <MiResumen
            dispatcher={props.dispatch}
            sesion={props.sesion}
            canciones={props.canciones}
            grupos={props.grupos}
          />
        )}
        {props.modo == "Bienvenida" && (
          <div className="text-center">
            <h2 className="m-3">Compone música y compártela al mundo</h2>
            <hl />
            <p className="font-weight-bold">
              Sé parte de blah blah blah blah blah blah blah blah
            </p>
            <hl />
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Compone música, por pistas, libre de derechos de autor
              </li>
              <li className="list-group-item">
                Copia música de otros autores y grupos. ¡Modificarla a tu
                antojo!
              </li>
              <li className="list-group-item">
                Coopera con autores de cualquier parte del mundo
              </li>
              <li className="list-group-item">¡Gratis!</li>
            </ul>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                props.dispatch({
                  type: "CHANGE_MODE",
                  modo: "Inicia sesión",
                });
              }}
            >
              Inicia sesión
            </button>
          </div>
        )}
        {props.modo == "Mi perfil" && <div>mi perfil</div>}
        {props.modo == "Mis canciones" && (
          <MisCanciones
            canciones={props.canciones}
            dispatcher={props.dispatch}
          />
        )}
        {props.modo == "Mis grupos" && <div>Mis grupos</div>}
        {props.modo == "Exploración" && <div>Exploración</div>}
        {props.modo == "Nueva canción" && (
          <NuevaCancion dispatcher={props.dispatch} />
        )}
        {props.modo == "Cancionando" && props.cancionActual && (
          <Cancion cancion={props.cancionActual} />
        )}
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
