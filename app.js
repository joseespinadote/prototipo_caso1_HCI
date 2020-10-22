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
            src="/imgs/menu.png"
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

const Explorador = (props) => {
  return (
    <div>
      <h3>Busca inspiración en canciones de otros artístas</h3>
      {props.canciones && (
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
                  {item.nombre}{" "}
                  <small>
                    <i>por {item.autor}</i>
                  </small>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

const Cancion = (props) => {
  return (
    <div>
      <div className="row">
        <div className="col">
          <h3>{props.cancion.nombre}</h3>
          <small>
            <i>por {props.cancion.autor}</i>
          </small>
        </div>
        <div className="col">
          <img className="m-1" src="/imgs/play-icon.png" width="25px" />
          <img className="m-1" src="/imgs/share.png" width="25px" />
        </div>
      </div>
      {props.cancion.pistas.length > 0 ? (
        <div>
          <ul className="list-group">
            {props.cancion.pistas.map((item, index) => {
              return (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => {
                    alert(
                      "Aqui se supone que se podrá ver el detalle de las pistas, editar las propias, y proponer cambios en canciones ajenas. No está implementado"
                    );
                  }}
                >
                  <img width="50px" src={item.icono} />
                  {item.nombre}
                  <img width="100%" src="/imgs/wave.jpg" />
                </li>
              );
            })}
          </ul>
          {props.cancion.autor == props.usuario ? (
            <div>
              <button
                className="btn btn-primary m-1"
                type="button"
                onClick={() => {
                  props.dispatcher({
                    type: "NEW_TRACK",
                    modo: "Pisteando",
                  });
                }}
              >
                Nueva pista
              </button>
              <button
                className="btn btn-secondary m-1"
                type="button"
                onClick={() => {
                  alert(
                    "Aun no implentado. Una canción consolidada no se puede editar"
                  );
                }}
              >
                Consolidar
              </button>
            </div>
          ) : (
            <div>
              <button
                className="btn btn-primary m-2"
                type="button"
                onClick={() => {
                  alert(
                    "No programado aun, pero la idea es grabar y enviar una pista y ver si el autor de la canción aprueba tu propuesta"
                  );
                }}
              >
                Proponer pista al autor
              </button>
              <button
                className="btn btn-success m-2"
                type="button"
                onClick={() => {
                  let copia = Object.assign({}, props.cancion);
                  copia.autor = props.usuario;
                  alert(
                    "Se clonará la canción, aparecerá como tuya en 'mis canciones'"
                  );
                  props.dispatcher({
                    type: "CLONE_SONG",
                    copia: copia,
                    modo: "Mis canciones",
                  });
                }}
              >
                Clonar canción
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h3>¡Tu canción aún no tiene pistas!</h3>
          <button
            className="btn btn-primary m-2"
            type="button"
            onClick={() => {
              props.dispatcher({
                type: "NEW_TRACK",
                modo: "Pisteando",
              });
            }}
          >
            Añade la primera pista
          </button>
        </div>
      )}
    </div>
  );
};

const NuevaCancion = (props) => {
  var nombreCancion = "";
  return (
    <form className="m-2">
      <div className="form-group">
        <label htmlFor="nombreCancion">
          Ingresa el nombre de tu nueva canción
        </label>
        <input
          className="form-control"
          id="nombreCancion"
          onChange={(e) => {
            nombreCancion = e.target.value;
          }}
        />
      </div>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          props.dispatcher({
            type: "NEW_SONG",
            nuevaCancion: {
              nombre: nombreCancion,
              pistas: [],
              autor: props.usuario,
            },
            modo: "Cancionando",
          });
        }}
      >
        Crear canción
      </button>
    </form>
  );
};

const Pista = (props) => {
  return (
    <div>
      <h3>
        {props.pista.nombre ? props.pista.nombre : "Ingrese un nombre de pista"}
      </h3>
      <form>
        <div className="form-group">
          <input
            className="form-control"
            value={props.pista.nombre}
            onChange={(e) => {
              props.dispatcher({
                type: "SET_TRACK_NAME",
                value: e.target.value,
              });
            }}
            placeholder="Nombre de la pista"
          />
        </div>
      </form>
      <h3>Seleccione un instrumento</h3>
      <div className="container">
        <div className="row justify-content-sm-center">
          <div
            className={
              "col-sm " +
              (props.pista.icono == "/imgs/icono.png" ? "bg-primary" : "")
            }
          >
            <img
              width="50px"
              src="/imgs/icono.png"
              onClick={() => {
                props.dispatcher({
                  type: "SET_TRACK_ICON",
                  value: "/imgs/icono.png",
                });
              }}
            />
          </div>
          <div
            className={
              "col-sm " +
              (props.pista.icono == "/imgs/keyboard_icon.png"
                ? "bg-primary"
                : "")
            }
          >
            <img
              width="50px"
              src="/imgs/keyboard_icon.png"
              onClick={() => {
                props.dispatcher({
                  type: "SET_TRACK_ICON",
                  value: "/imgs/keyboard_icon.png",
                });
              }}
            />
          </div>
          <div
            className={
              "col-sm " +
              (props.pista.icono == "/imgs/drums_icon.png" ? "bg-primary" : "")
            }
          >
            <img
              width="50px"
              src="/imgs/drums_icon.png"
              onClick={() => {
                props.dispatcher({
                  type: "SET_TRACK_ICON",
                  value: "/imgs/drums_icon.png",
                });
              }}
            />
          </div>
        </div>
      </div>
      <h3>¡Ha grabar! (no funciona)</h3>
      <img width="50%" src="/imgs/recording_buttons.png" />
      <img width="100%" src="/imgs/wave.jpg" />
      <button
        disabled={!props.pista.nombre || !props.pista.icono}
        className="btn btn-primary m-2"
        onClick={() => {
          props.dispatcher({ type: "SAVE_TRACK", modo: "Cancionando" });
        }}
      >
        ¡Listo!
      </button>
    </div>
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
      <hr />
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
      <hr />
      <h4>Mis grupos recientes</h4>
      Esta funcionalidad no está programada aún
      <hr />
      <h4>Explora música de otros autores</h4>
      ¡Y copia y modifica sus canciones sin culpa!
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          props.dispatcher({ type: "CHANGE_MODE", modo: "Exploración" });
        }}
      >
        Explorar música de otros autores
      </button>
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
          <button
            className="btn btn-primary m-2"
            onClick={() => {
              props.dispatcher({ type: "CHANGE_MODE", modo: "Nueva canción" });
            }}
          >
            Nueva canción
          </button>
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
              <label htmlFor="exampleInputEmail1">Ingresa tu usuario</label>
              <input
                placeholder="Cualquier cosa sin contraseña"
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
                if (nombreUsuario.length == 0) {
                  alert("Debes poner un nombre para que esta cosa funcione");
                  return;
                }
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
            <hr />
            <p className="font-weight-bold">
              Sé parte de blah blah blah blah blah blah blah blah
            </p>
            <hr />
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
        {props.modo == "Mi perfil" && (
          <div>
            <h3>Mi perfil</h3>
            <ul>
              <li>Nombre de usuario: {props.sesion.nombre}</li>
              <li>Num. de visitas: xxx</li>
              <li>Num. de canciones: {props.canciones.length}</li>
              <li>Num. de grupos: {props.grupos.length}</li>
            </ul>
            <button
              className="btn btn-primary btn-sm m-1"
              type="button"
              onClick={() => {
                alert("No implementado");
              }}
            >
              Cambiar contraseña
            </button>
            <button
              className="btn btn-danger btn-sm m-1"
              type="button"
              onClick={() => {
                alert("Tampoco esta implementado");
              }}
            >
              Eliminar cuenta
            </button>
          </div>
        )}
        {props.modo == "Mis canciones" && (
          <MisCanciones
            canciones={props.canciones}
            dispatcher={props.dispatch}
          />
        )}
        {props.modo == "Mis grupos" && (
          <div>
            <h3>Mis grupos</h3>
            <p>
              Acá se supone que se podrán hacer grupos con diferente usuarios.
              No está implementado
            </p>
          </div>
        )}
        {props.modo == "Exploración" && (
          <div>
            <Explorador
              dispatcher={props.dispatch}
              canciones={props.otrasCanciones}
            />
          </div>
        )}
        {props.modo == "Nueva canción" && (
          <NuevaCancion
            dispatcher={props.dispatch}
            usuario={props.sesion.nombre}
          />
        )}
        {props.modo == "Cancionando" && props.cancionActual && (
          <Cancion
            dispatcher={props.dispatch}
            cancion={props.cancionActual}
            usuario={props.sesion.nombre}
          />
        )}
        {props.modo == "Pisteando" && props.pistaActual && (
          <Pista dispatcher={props.dispatch} pista={props.pistaActual} />
        )}
      </div>
    </div>
  );
};

const connector = connect((state) => state);

module.exports = connector(App);
