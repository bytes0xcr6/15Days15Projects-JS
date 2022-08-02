(function () {
  let DB;
  let idCliente;

  const nombreInput = document.querySelector("#nombre");
  const emailInput = document.querySelector("#email");
  const telefonoInput = document.querySelector("#telefono");
  const empresaInput = document.querySelector("#empresa");

  const formulario = document.querySelector("#formulario");

  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();

    // Actualiza el registro.
    formulario.addEventListener("submit", actulizarCliente);

    // verificar el ID de la URL
    const parametrosURL = new URLSearchParams(window.location.search);

    const idCliente = parametrosURL.get("id");

    if (idCliente) {
      setTimeout(() => {
        obtenerCliente(idCliente);
      }, 100);
    }
  });

  function actulizarCliente(e) {
    e.prevent.default();

    if (
      nombreInput.value === "" ||
      emailInput.value === "" ||
      empresaInput.value === "" ||
      telefonoInput.value === ""
    ) {
      imprimirAlerta("Todos los campos son obligatorios");

      return;
    }

    // Actualizar cliente
    const clienteActualizado = {
      nombre: nombreInput.value,
      email: emailInput.value,
      empresa: empresaInput.value,
      telefono: telefonoInput.value,
      id: Number(idCliente),
    };

    const transaction = DB.transaction(["crm"], "readwrite");
    const objectStore = transaction.objectStore("crm");

    objectStore.put(clienteActualizado);

    transaction.oncomplete = function () {
      imprimirAlerta("Editando Correctamente");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    };

    transaction.onerror = function () {
      console.log("Hubo un error", "error");
    };
  }

  function obtenerCliente(id) {
    const transaction = DB.transaction(["crm"], "readonly");
    const objectStore = transaction.objectStore("crm");

    const cliente = objectStore.openCursor();
    cliente.onsuccess = function (e) {
      const cursor = e.target.result;

      if (cursor) {
        if (cursor.value.id === Number(id)) {
          llenarFormulario(cursor.value);
        }
        cursor.continue();
      }
    };
  }

  function llenarFormulario(datosCliente) {
    const { nombre, telefono, empresa, email } = datosCliente;

    nombreInput.value = nombre;
    emailInput.value = email;
    telefonoInput.value = telefono;
    empresaInput.value = empresa;
  }

  function conectarDB() {
    const abrirConexion = window.indexedDB.open("crm", 1);

    abrirConexion.onerror = function () {
      console.log("hubo un error en la conexion");
    };

    abrirConexion.onsuccess = function () {
      DB = abrirConexion.result;
      console.log("Se conecto correctamente");
    };
  }
})();
