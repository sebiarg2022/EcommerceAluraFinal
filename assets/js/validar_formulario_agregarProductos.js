const urlProducto = document.querySelector("#urlProducto");
const categoriaProducto = document.querySelector("#categoriaProducto");
const nombreProducto = document.querySelector("#nombreProducto");
const precioProducto = document.querySelector("#precioProducto");
const descripcionProducto = document.querySelector("#descripcionProducto");
const lblProductos = document.querySelector(".nuevo__producto-lbl");
const codigoProducto = document.querySelector("#codigoProducto");

urlProducto.addEventListener("input", function () {
  // validacion campo url
  validacionFormProductos(urlProducto);
});

urlProducto.addEventListener("input", function () {
  // validacion campo categoria
  validacionFormProductos(urlProducto);
});

categoriaProducto.addEventListener("input", function () {
  // validacion campo categoria
  validacionFormProductos(categoriaProducto);
});

nombreProducto.addEventListener("input", function () {
  // validacion campo categoria
  validacionFormProductos(nombreProducto);
});

precioProducto.addEventListener("input", function () {
  // validacion campo categoria
  validacionFormProductos(precioProducto);
});

codigoProducto.addEventListener("input", function () {
  // validacion campo categoria
  validacionFormProductos(codigoProducto);
});

descripcionProducto.addEventListener("input", function () {
  // validacion campo categoria
  validacionFormProductos(descripcionProducto);
});

function validacionFormProductos(campo) {
  const lbl = campo.parentNode; //padre del hijo en este caso de input es el lbl de cada uno a aplicar
  if (campo.validity.valid) {
    lbl.parentElement.classList.remove("input-container--invalid");
    //si no hay error el span lo ponemos en vacio
    lbl.parentElement.querySelector("span").innerHTML = "";
  }

  if (campo.value.length == 0) {
    //agregar la clase de error si el campo es invalido no cumple la validacion
    lbl.parentElement.classList.add("input-container--invalid");
    //si hay error el span toma el valor que devuelve la fun mostrarMensajeDeError();
    lbl.parentElement.querySelector("span").innerHTML =
      "el campo no puede estar vacio";
    lbl.focus();
    return false;
  }
}

function validarIngresoSoloNumerico(evt) {
  const lblPrecio = precioProducto.parentNode;
  const lblCodigo = codigoProducto.parentNode;

  // code is the decimal ASCII representation of the pressed key.
  var code = evt.which ? evt.which : evt.keyCode;

  if (code == 44) {
    // permitir la coma ,
    return true;
  } else if (code >= 48 && code <= 57) {
    // todos los numeros
    return true;
  } else {
    // other keys.
    if (precioProducto == evt.target) {
      //agregar la clase de error si el campo es invalido no cumple la validacion
      lblPrecio.parentElement.classList.add("input-container--invalid");
      //si hay error el span toma el valor que devuelve la fun mostrarMensajeDeError();
      lblPrecio.parentElement.querySelector("span").innerHTML =
        "En este campo debe colocar el precio del Producto(0-9 ,)";
      precioProducto.focus();
      return false;
    }
    if (codigoProducto == evt.target) {
      //agregar la clase de error si el campo es invalido no cumple la validacion
      lblCodigo.parentElement.classList.add("input-container--invalid");
      //si hay error el span toma el valor que devuelve la fun mostrarMensajeDeError();
      lblCodigo.parentElement.querySelector("span").innerHTML =
        "En este campo debe colocar el codigo del Producto(0-9 ,)";
      codigoProducto.focus();
      return false;
    }
  }
}

function validacion(campo1, campo2) {
  const inputs = document.querySelectorAll(".nuevo__producto-input");
  inputs.forEach((input) => {
    validacionFormProductos(input);
  });
  validarIngresoSoloNumerico(evt);
}
