const carrito = document.querySelector("#carrito");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCarrito = document.querySelector("#lista-carrito tbody");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
  listaCursos.addEventListener("click", agregarCurso);
  carrito.addEventListener("click", borrarCurso);

  document.addEventListener("DOMContentLoaded", () => {
    articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carritoHTML();
  });

  vaciarCarrito.addEventListener("click", () => {
    articulosCarrito = [];

    limpiarCarrito();
  });
}

function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("agregar-carrito")) {
    const curso = e.target.parentElement.parentElement;
    leerDatosCurso(curso);
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("A").getAttribute("data-id"),
    cantidad: 1,
  };
  if (articulosCarrito.some((curso) => curso.id === infoCurso.id)) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

function carritoHTML() {
  limpiarCarrito();

  articulosCarrito.forEach((curso) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>  
           <img src="${curso.imagen}" width=100>
      </td>
      <td>${curso.titulo}</td>
      <td>${curso.precio}</td>
      <td>${curso.cantidad} </td>
      <td>
           <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
      </td>
    `;

    listaCarrito.appendChild(row);
  });

  // Agrear carrito a local Storage
  sincronizarStorage();
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function limpiarCarrito() {
  //  listaCarrito.innerHTML = "";

  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }
}

function borrarCarrito() {
  listaCarrito.textContent = "";
}

function borrarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML();
  }
}
