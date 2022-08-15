import { productoController } from "./producto.controller.js";
import { servicioProductos } from "../servicios/servicio-cliente.js";

const inputBuscar = document.querySelector(".header__input-search");
const btnBuscar = document.querySelector(".header__btn-search");
const section = document.querySelector(".productos");
inputBuscar.value = "";

inputBuscar.addEventListener("keyup", () => {
  let texto = inputBuscar.value.toLowerCase();
  if (inputBuscar.value.toLowerCase() == "") {
    section.innerHTML = "";
    productoController.cargarTodo();
  } else {
    section.innerHTML = "";
    buscarProd(texto);
  }
});

//fun buscar
const buscarProd = (texto) => {
  servicioProductos.listaProductos().then((data) => {
    data.sort(function (a, b) {
      var reproA = a.categoria.toLowerCase();
      var reproB = b.categoria.toLowerCase();

      return reproA < reproB ? -1 : reproA < reproB ? 1 : 0;
    });

    const categorias = productoController.listadoCategorias(data);

    categorias.forEach((c) => {
      const nuevaLinea = productoController.nuevaLineaTitulo(c);
      section.appendChild(nuevaLinea);
    });

    //traemos todos los elementos que tienen clase product list
    const tables = document.querySelectorAll(".productos__list");
    //recorremos todos los elementos con laclase product list
    for (var i = 0; i < tables.length; i++) {
      const table = tables[i];
      const idtables = document.getElementsByClassName("productos__list")[i].id;
      let cont = 0;

      data.forEach(({ url, categoria, nombre, precio, id }) => {
        if (idtables.includes(categoria)) {
          if (nombre.toLowerCase().indexOf(texto) !== -1) {
            const nuevaLinea = productoController.crearNuevaLinea(
              url,
              categoria,
              nombre,
              precio,
              id
            );
            table.appendChild(nuevaLinea);
            cont++;
          }
        }
      });

      if (cont == 0) {
        table.innerHTML += `
          <td class="td-error" data-td>NO EXISTE PRODUCTO</td> `;
        table.classList.add("td-error");
      }
    }
  });
};
