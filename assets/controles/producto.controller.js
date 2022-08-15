import { servicioProductos } from "../servicios/servicio-cliente.js";

const section = document.querySelector(".productos");

const crearNuevaLinea = (url, categoria, nombre, precio, id) => {
  const linea = document.createElement("div");
  linea.classList.add("productos__card");

  //backticks ` xxxxx ` comillas de ejecucion  <img class="productos__card--img" src = "assets/img/productos/${categoria}s/${url}"  alt = "productos imagen">
  const contenido = `

                        <img class="productos__card--img" src = "${url}"  alt = "productos imagen">
                        <div class="productos__card--info">
                            <p class="productos__card--title">${nombre}</p>
                            <p class="productos__card--price">${precio}</p>
                            <a href ="assets/paginas/productos_detalle.html?id=${id}"><button class="productos__card-boton">Ver producto</button></a>
                            <button id="boton-carrito"><i class="fas fa-shopping-cart"></i><span id="contadorCarrito"></span></button>
                            </div>`;

  linea.innerHTML = contenido;
  return linea;
};

function cargarTodo() {
  servicioProductos
    .listaProductos()
    .then((data) => {
      //Ordenar x categoria para mostrar (los mas cercanos primero)
      data.sort(function (a, b) {
        var reproA = a.categoria.toLowerCase();
        var reproB = b.categoria.toLowerCase();

        return reproA < reproB ? -1 : reproA < reproB ? 1 : 0;
      });

      const categorias = listadoCategorias(data);
      categorias.forEach((c) => {
        const nuevaLinea = nuevaLineaTitulo(c);
        section.appendChild(nuevaLinea);
      });

      //traemos todos los elementos que tienen clase product list
      const tables = document.querySelectorAll(".productos__list");
      //recorremos todos los elementos con laclase product list
      for (var i = 0; i < tables.length; i++) {
        const table = tables[i];
        //obtenemos la id de ese elemento para comparar e insertarle todos los elementos que son igual a ese div
        const idtables =
          document.getElementsByClassName("productos__list")[i].id;

        //recorremos todo el data (JSON) de articulos
        data.forEach((producto) => {
          //si id del div es igual a la categoria del producto dentro del data lo insertamos en ese di
          if (idtables.includes(producto.categoria.toLowerCase())) {
            //agregamos este nuevo array las fechas que no esten repetidas
            const creaLinea = crearNuevaLinea(
              producto.url,
              producto.categoria,
              producto.nombre,
              producto.precio,
              producto.id
            );
            //este es uno de todos los div tables que trajimos y estamos recorriendo
            table.appendChild(creaLinea);
          }
        });
      }
    })
    .catch((error) => alert("Ocurrio un error"));
}

cargarTodo();

//esta funcion obtiene tods las categorias existentes dentro del JSON
const listadoCategorias = (data) => {
  const categorias = [];
  data.forEach((producto) => {
    //guardamos en un array cada categoria existente dentro de nuestro array
    if (!categorias.includes(producto.categoria)) {
      //agregamos la nueva categoria q encontramos a nuestro array
      categorias.push(producto.categoria);
    }
  });

  return categorias;
};

const listadoCategoriasRestante = (data) => {
  const categorias = [];
  const restante = "1";

  data.forEach((producto) => {
    //guardamos en un array cada categoria existente dentro de nuestro array
    if (categorias.includes(producto.id)) {
      if (restante != producto.id) {
        //agregamos la nueva categoria q encontramos a nuestro array
        categorias.push(producto.id);
      }
    }
  });
  return categorias;
};

//funcion crea la linea del titulo usando cada categoria obtenida dentro de nuestro JSON
const nuevaLineaTitulo = (categoria) => {
  const linea = document.createElement("div");
  linea.classList.add("productos__container");

  const div_header = document.createElement("div");
  div_header.classList.add("productos__header");
  linea.appendChild(div_header);

  const h2_titulo = document.createElement("h2");
  h2_titulo.classList.add("productos__title");
  h2_titulo.innerText = categoria;
  div_header.appendChild(h2_titulo);

  const a_link_todo = document.createElement("a");
  a_link_todo.classList.add("productos__mostrar");
  a_link_todo.innerText = "ver todos";
  a_link_todo.src = "assets/img/iconos/arow.svg";
  a_link_todo.dataset.tipo = "todos";
  var link = "assets/paginas/productos_todos.html";
  a_link_todo.setAttribute("href", link);
  a_link_todo.setAttribute("src", "assets/img/iconos/arow.svg");

  const a_img = document.createElement("img");
  a_img.src = "assets/img/iconos/arow.svg";
  a_link_todo.appendChild(a_img);

  div_header.appendChild(a_link_todo);

  const div_lista_productos = document.createElement("div");
  div_lista_productos.classList.add("productos__list");
  div_lista_productos.setAttribute("id", categoria);
  linea.appendChild(div_lista_productos);
  return linea;
};

//exportamos client services de controller
export const productoController = {
  listadoCategorias,
  nuevaLineaTitulo,
  crearNuevaLinea,
  cargarTodo,
};
