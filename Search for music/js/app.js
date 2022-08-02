import * as UI from "./interfaz.js";
import API from "./api.js";

UI.formulario.addEventListener("submit", buscarCancion);

function buscarCancion(e) {
  e.preventDefault();

  //Obtener datos del formulario
  const artista = document.querySelector("#artista").value;
  const cancion = document.querySelector("#cancion").value;

  if (artista === "" || cancion === "") {
    UI.divMensajes.textContent = "Error... Todos los campos son obligatorios";
    UI.divMensajes.classList.add("error");

    setTimeout(() => {
      UI.divMensajes.textContent = "";
      UI.divMensajes.classList.remove("error");
    }, 3000);

    return;
  }

  // consultar API

  const busqueda = new API(artista, cancion);
  busqueda.consultarAPI();

  console.log(busqueda);
}
