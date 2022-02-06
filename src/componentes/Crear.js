import React from "react";
import { Link } from "react-router-dom";
import Api from "../servicios/api";

class Crear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nombre: "",
      correo: "",
    };
  }

  cambioValor = (e) => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ state });
  };

  enviarDatos = (e) => {
    e.preventDefault();
    console.log("Formulario enviado...");

    const { nombre, correo } = this.state;
    console.log(nombre);
    console.log(correo);

    var datosEnviar = { nombre: nombre, correo: correo };

    fetch(Api + "?insertar=1", {
      method: "POST",
      body: JSON.stringify(datosEnviar),
    })
      .then((respuesta) => respuesta.json())
      .then((datosRespuesta) => {
        console.log(datosRespuesta);
        this.props.history.push("/");
      })
      .catch(console.log);
  };

  render() {
    const { nombre, correo } = this.state;

    return (
      <div className="card">
        <div className="card-header">Crear empleado</div>
        <div className="card-body">
          <form onSubmit={this.enviarDatos}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={nombre}
                onChange={this.cambioValor}
                id="nombre"
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
                required
              />
              <small id="helpId" className="text-muted">
                Escribe el nombre del empleado
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="correo">Correo</label>
              <input
                type="email"
                name="correo"
                value={correo}
                onChange={this.cambioValor}
                id="correo"
                className="form-control"
                placeholder=""
                aria-describedby="helpId"
                required
              />
              <small id="helpId" className="text-muted">
                Escribe el correo del empleado
              </small>
            </div>
            <div className="btn-group" role="group" aria-label="">
              <button type="submit" className="btn btn-success">
                Agregar nuevo empleado
              </button>
              <Link to={"/"} type="button" className="btn btn-primary">
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Crear;
