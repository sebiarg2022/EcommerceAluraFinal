import { servicioProductos } from "../servicios/servicio-cliente.js";

const inputBuscar = document.querySelector(".header__input-search");
const btnBuscar = document.querySelector(".header__btn-search");
//section
const section = document.querySelector(".productos");
const table = document.querySelector(".productos__list");
inputBuscar.value = "";

//creamos linea de cada item producto a cargar
const crearNuevaLinea = (url, categoria, nombre, precio, id) => {
  const linea = document.createElement("div");
  linea.classList.add("productos__card");

  //backticks ` xxxxx ` comillas de ejecucion  <img class="productos__card--img" src = "../img/productos/${categoria}s/${url}"  alt = "productos imagen">
  const contenido = `
 
                      <img class="productos__card--img" src = "${url}"  alt = "productos imagen">
                      <div class="productos__card--info">
                          <p class="productos__card--title">${nombre}</p>
                          <p class="productos__card--price">${precio}</p>
                          <a href ="../paginas/productos_detalle.html?id=${id}"><button class="productos__card-boton">Ver producto</button></a>
                          <button id="boton-carrito"><i class="fas fa-shopping-cart"></i><span id="contadorCarrito"></span></button>
                          </div>`;

  linea.innerHTML = contenido;
  return linea;
};

const mostrarTodoClientes = () => {
  servicioProductos
    .listaProductos()
    .then((data) => {
      //Ordenar x categoria para mostrar (los mas cercanos primero)
      data.sort(function (a, b) {
        var reproA = a.categoria.toLowerCase();
        var reproB = b.categoria.toLowerCase();

        return reproA < reproB ? -1 : reproA < reproB ? 1 : 0;
      });

      data.forEach((producto) => {
        const nuevaLinea = crearNuevaLinea(
          producto.url,
          producto.categoria,
          producto.nombre,
          producto.precio,
          producto.id
        );
        table.appendChild(nuevaLinea);
      });
    })
    //sino error
    .catch((error) => alert("Ocurrio un error"));
};

mostrarTodoClientes();

inputBuscar.addEventListener("keyup", () => {
  let texto = inputBuscar.value.toLowerCase();

  if (inputBuscar.value.toLowerCase() == "") {
    table.innerHTML = "";
    console.log("2");
    mostrarTodoClientes();
  } else {
    table.innerHTML = "";
    buscarProducto(texto);
  }
});

const buscarProducto = (texto) => {
  servicioProductos.listaProductos().then((data) => {
    let cont = 0;

    data.forEach(({ url, categoria, nombre, precio, id }) => {
      if (nombre.toLowerCase().indexOf(texto) !== -1) {
        const nuevaLinea =
          crearNuevaLinea(url, categoria, nombre, precio, id) 
          table.appendChild(nuevaLinea);
        cont++;
      }
    });

    if (cont == 0 || cont == "") {
      table.innerHTML += `
           <td class="td-error2" data-td>NO EXISTE PRODUCTO </td> `;
      table.classList.add("td-error2");
    }
  });
};

export const mostrarTodoProd = {
  mostrarTodoClientes,
  crearNuevaLinea,
};
