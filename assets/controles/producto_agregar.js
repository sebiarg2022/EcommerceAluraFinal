import { servicioProductos } from "../servicios/servicio-cliente.js";

const urlProducto = document.querySelector("#urlProducto");
const categoriaProducto = document.querySelector("#categoriaProducto");
const nombreProducto = document.querySelector("#nombreProducto");
const precioProducto = document.querySelector("#precioProducto");
const codigoProducto = document.querySelector("#codigoProducto");
const descripcionProducto = document.querySelector("#descripcionProducto");
const btn_agregar_producto = document.querySelector(".nuevo__producto__button");
const lblProductos = document.querySelector(".nuevo__producto-lbl");
const inputs = document.querySelectorAll(".nuevo__producto-input");
let cont = 0;

const validacion = (input) => {
  const lbl = input.parentNode; //padre del hijo en este caso de input es el lbl de cada uno a aplicar
  if (input.validity.valid) {
    lbl.parentElement.classList.remove("input-container--invalid");
    lbl.parentElement.querySelector("span").innerHTML = "";
    return false;
  }

  if (input.value.length == 0) {
    input.parentElement.classList.add("input-container--invalid");
    lbl.parentElement.querySelector("span").innerHTML =
      "el campo no puede estar vacio";
    cont++;
    return false;
  }
};

btn_agregar_producto.addEventListener("click", (evento) => {
  evento.preventDefault();
  cont = 0;
  inputs.forEach((input) => {
    validacion(input);
  });

  if (cont == 0) {
    servicioProductos
      .crearProducto(
        urlProducto.value,
        categoriaProducto.value.toLowerCase(),
        nombreProducto.value,
        precioProducto.value,
        codigoProducto.value,
        descripcionProducto.value
      )
      .then(() => {
        window.location.href = "creacion_concluida.html";
      })
      .catch((err) => console.log(err));
  }
});
