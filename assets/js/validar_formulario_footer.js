const formContacto = document.querySelector(".contacto__formulario");
const errorNombre = document.querySelector("#error-nombre");
const errorMensaje = document.querySelector("#error-mensaje");
const nombreFooter = document.querySelector(".input_nombre_formulario");
const mensajeFooter = document.querySelector(".textarea_mensaje");
const btnEnviarMje = document.querySelector(".contacto__button");

nombreFooter.addEventListener("input", function () {
  // validacion campo nombre
  validarFormFooter(nombreFooter);
});

mensajeFooter.addEventListener("input", function () {
  // validacion campo mensaje
  validarFormFooter(mensajeFooter);
});

function validarFormFooter(campo) {
  // validacion campo nombre
  if (campo.validity.valid) {
    campo.parentElement.classList.remove("input-container--invalid");
    //si no hay error el span lo ponemos en vacio
    campo.parentElement.querySelector("span").innerHTML = "";
  } else {
    if (campo.validity.valueMissing) {
      //agregar la clase de error si el campo es invalido no cumple la validacion
      campo.parentElement.classList.add("input-container--invalid");
      //si hay error el span toma el valor que devuelve la fun mostrarMensajeDeError();
      campo.parentElement.querySelector("span").innerHTML =
        "El campo no puede estar vacio";
    }
  }
}

btnEnviarMje.addEventListener("click", (evento) => {
  if (!nombreFooter.validity.valid || !mensajeFooter.validity.valid) {
    evento.preventDefault();
    validarFormFooter(nombreFooter);
    validarFormFooter(mensajeFooter);
  } else {
    evento.preventDefault();
    nombreFooter.value = "";
    mensajeFooter.value = "";

    const spanMje = document.querySelector(".envioMje");
    spanMje.classList.add("envioMjeActivo");

    //Se crea un Intervalo para restaurar el texto inicial del boton
    const txtMjeEnviado = setInterval(() => {
      spanMje.classList.remove("envioMjeActivo");
      clearInterval(txtMjeEnviado);
    }, 3000);
  }
});
