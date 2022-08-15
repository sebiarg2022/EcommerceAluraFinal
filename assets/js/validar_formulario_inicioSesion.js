const errorEmail = document.querySelector("#error_login_email");
const errorPassword = document.querySelector("#error_login_password");
const emailLogin = document.querySelector(".input__login-correo");
const passwordLogin = document.querySelector(".input__login-password");
const btnLogin = document.querySelector(".login__button");
const icon_password = document.querySelector(".input-icon");

emailLogin.addEventListener("input", function () {
  // validacion campo
  validacionEmail(emailLogin);
});

passwordLogin.addEventListener("input", function () {
  validacionPassword(passwordLogin);
});

icon_password.addEventListener("click", () => {
  if (passwordLogin.type == "password") {
    passwordLogin.type = "text";

    const mostrarPass = setInterval(() => {
      passwordLogin.type = "password";
      clearInterval(mostrarPass);
    }, 1500);
  } else {
    passwordLogin.type = "password";
  }
});

function validacionEmail(campoEmail) {
  if (campoEmail.validity.valid) {
    campoEmail.parentElement.classList.remove("input-container--invalid");
    //si no hay error el span lo ponemos en vacio
    campoEmail.parentElement.querySelector("span").innerHTML = "";
  }

  if (campoEmail.value.length == 0) {
    //agregar la clase de error si el campo es invalido no cumple la validacion
    campoEmail.parentElement.classList.add("input-container--invalid");
    //si hay error el span toma el valor que devuelve la fun mostrarMensajeDeError();
    campoEmail.parentElement.querySelector("span").innerHTML =
      "el campo email no puede estar vacio";
    campoEmail.focus();
    return false;
  }
  //expresion regular para validar un email
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(campoEmail.value)) {
    //agregar la clase de error si el campo es invalido no cumple la validacion
    campoEmail.parentElement.classList.add("input-container--invalid");
    //si hay error el span toma el valor que devuelve la fun mostrarMensajeDeError();
    campoEmail.parentElement.querySelector("span").innerHTML =
      "El campo email ingresado es invalido";
    campoEmail.focus();
    return false;
  }
}

function validacionPassword(campoPass) {
  if (campoPass.validity.valid) {
    campoPass.parentElement.classList.remove("input-container--invalid");
    campoPass.parentElement.querySelector("span").innerHTML = "";
  }

  if (campoPass.value.length == 0) {
    campoPass.parentElement.classList.add("input-container--invalid");
    campoPass.parentElement.querySelector("span").innerHTML =
      "el campo contraseña no puede estar vacio";
    return false;
  }

  if (campoPass.value.trim().length < 6) {
    campoPass.parentElement.classList.add("input-container--invalid");
    campoPass.parentElement.querySelector("span").innerHTML =
      "el campo contraseña minimo debe tener 6 caracteres";
    return false;
  }
}

btnLogin.addEventListener("click", (evento) => {
  if (
    !emailLogin.value.includes("admin@alura.com") ||
    passwordLogin.value != "123456"
  ) {
    evento.preventDefault();
    errorInicioSesion();
  } else {
    evento.preventDefault();
    inicioSesion();
  }
});

function inicioSesion() {
  emailLogin.value = "";
  passwordLogin.value = "";
  window.location.href = "../paginas/productos.html";
}

function errorInicioSesion() {
  const spanMje = document.querySelector(".mjeLogin");
  spanMje.classList.add("mjeLoginActivo");
  emailLogin.parentElement.classList.add("input-container--invalid");
  passwordLogin.parentElement.classList.add("input-container--invalid");
  //Se crea un Intervalo para restaurar el texto inicial del boton
  const txtMjeEnviado = setInterval(() => {
    spanMje.classList.remove("mjeLoginActivo");
    clearInterval(txtMjeEnviado);
  }, 1500);
}
