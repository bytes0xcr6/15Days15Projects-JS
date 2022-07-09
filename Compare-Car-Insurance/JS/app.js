// constructores

function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

//Realiza la cotizacion con los datos

Seguro.prototype.cotizarSeguro = function () {
  /*
    ID) 1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
  */

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;

    case "2":
      cantidad = base * 1.05;
      break;

    case "3":
      cantidad = base * 1.35;
      break;

    default:
      break;
  }

  // Leer el año
  const diferencia = new Date().getFullYear() - this.year;
  // Cada año menos el costo se reduce un 3% del seguro
  cantidad -= diferencia * 0.03 * cantidad;

  /*
    Si el seguro es basico * 1.30
    Si el seguro es completo *1.50
  */

  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return cantidad;
};

function UserInterface() {}

//llenar las opciones de los años

UserInterface.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 20;

  const selectYear = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

// Muestra alerta en pantalla
UserInterface.prototype.mostrarMensaje = function (mensaje, tipo) {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }

  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  //Insertar HTML
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 1500);
};

UserInterface.prototype.mostrarResultado = function (total, seguro) {
  const div = document.createElement("div");
  div.classList.add("mt-10");

  const { marca, year, tipo } = seguro;

  let textoMarca;

  switch (marca) {
    case "1":
      textoMarca = "Americano";
      break;
    case "2":
      textoMarca = "Asiatico";
      break;
    case "3":
      textoMarca = "Europeo";
      break;
    default:
      break;
  }

  div.innerHTML = `
    <p class="header"> Tu Resumen </p>
    <p class="font-bold"> Total: <spam class="font-normal">$ ${total}</spam> </p>
    <p class="font-bold"> Year: <spam class="font-normal">$ ${year}</spam> </p>
    <p class="font-bold"> Tipo: <spam class="font-normal capitalize"> ${tipo}</spam> </p>
    <p class="font-bold"> Marca: <spam class="font-normal"> ${textoMarca}</spam> </p>

  
  `;
  const resultadoDiv = document.querySelector("#resultado");

  // Mostrar Spinner
  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";
  setTimeout(() => {
    spinner.style.display = "none";
    resultadoDiv.appendChild(div);
  }, 3000);
};

//Instanciar UserInterface
const ui = new UserInterface();

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones();
});

// EVENTS
eventListener();

function eventListener() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  // leer la marca seleccionada
  const marca = document.querySelector("#marca").value;

  //leer el año seleccionado
  const year = document.querySelector("#year").value;

  // leer el tipo de cobertura
  const tipo = document.querySelector(`input[name="tipo"]:checked`).value;

  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  } else {
    ui.mostrarMensaje("Cotizando... ", "correcto");
  }

  // Ocultar las cotizaciones previas
  const resultados = document.querySelector("#resultado div");
  if (resultados != null) {
    resultados.remove();
  }

  //Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);

  const total = seguro.cotizarSeguro();

  //Utilizar el prototype que va a cotizar
  ui.mostrarResultado(total, seguro);
}
