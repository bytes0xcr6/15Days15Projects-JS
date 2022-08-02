const criptomonedasSelect = document.querySelector("#criptomonedas");
const monedaSelect = document.querySelector("#moneda");

const formulario = document.querySelector("#formulario");
const resultado = document.querySelector("#resultado");

const objBusqueda = {
  moneda: ``,
  criptomoneda: ``,
};

// Crear un promise
const obtenerCriptomonedas = (criptomonedas) =>
  new Promise((resolve) => {
    resolve(criptomonedas);
  });

document.addEventListener("DOMContentLoaded", () => {
  consultarCriptomonedas();

  formulario.addEventListener("submit", submitFormulario);

  criptomonedasSelect.addEventListener("change", leerValor);
  monedaSelect.addEventListener("change", leerValor);
});

function consultarCriptomonedas() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=100&tsym=USD";

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((resultado) => obtenerCriptomonedas(resultado.Data))
    .then((criptomonedas) => selectCriptomonedas(criptomonedas));
}

function selectCriptomonedas(criptomonedas) {
  criptomonedas.forEach((cripto) => {
    const { FullName, Name } = cripto.CoinInfo;

    const option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;

    criptomonedasSelect.appendChild(option);
  });
}

function leerValor(e) {
  objBusqueda[e.target.name] = e.target.value;
}

function submitFormulario(e) {
  e.preventDefault();

  // validar
  const { moneda, criptomoneda } = objBusqueda;

  if (moneda === `` || criptomoneda === ``) {
    mostrarAlerta("Ambos campos son obligatorios");
    return;
  }

  //Consultar la API con los resultados!
  consultarAPI();
}

function mostrarAlerta(mensaje) {
  const existeError = document.querySelector(".error");

  if (!existeError) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("error");
    divMensaje.innerHTML = `Error! ${mensaje}`;

    formulario.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}

function consultarAPI() {
  const { moneda, criptomoneda } = objBusqueda;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  mostrarSpinner();

  fetch(url)
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((cotizacion) => {
      mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);
    });
}

function mostrarCotizacionHTML(cotizacion) {
  limpiarHTML();

  const { PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, LASTUPDATE, MKTCAP } =
    cotizacion;
  const precio = document.createElement("p");
  precio.classList.add("precio");
  precio.innerHTML = `
    Precio actual: <span>${PRICE}</span>

  `;

  const extraInfo = document.createElement("div");
  extraInfo.innerHTML = `
    <p>Máximo diario: <span>${HIGHDAY}</span></p>
    <p>Mínimo diario: <span>${LOWDAY}</span></p>
    <p>Variación últimas 24 horas: <span>${CHANGEPCT24HOUR}%</span></p>
    <p>Último Update: <span>${LASTUPDATE}</span></p>
    <p>Market Cap: <span>${MKTCAP}</span></p>

  `;

  resultado.appendChild(precio);
  resultado.appendChild(extraInfo);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function mostrarSpinner() {
  limpiarHTML;

  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  spinner.innerHTML = `
   <div class="spinner">
   <div class="cube1"></div>
   <div class="cube2"></div>
   </div>
  `;

  resultado.appendChild(spinner);
}
