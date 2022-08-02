import * as UI from "./interfaz.js";

class API {
  constructor(artista, cancion) {
    this.artista = artista;
    this.cancion = cancion;
  }

  consultarAPI() {
    const url = `https://api.lyrics.ovh/v1/${this.artista}/${this.cancion}`;

    fetch(url)
      .then((respuesta) => {
        return respuesta.json();
      })
      .then((datos) => {
        if (resultado.lyrics) {
          const { lyrics } = resultado;
          UI.divResultado.textContent = lyrics;
          UI.headingResultado.textContent = `Letra de la cancion: ${cancion}`;
        } else {
          UI.divMensajes.textContent =
            "La cancion no existe, prueba con otro busqueda";
          UI.divMensajes.classList.add("error");

          setTimeout(() => {
            UI.divMensajes.textContent = "";
            UI.divMensajes.classList.remove("error");
          }, 2000);
        }
      });
  }
}

export default API;
