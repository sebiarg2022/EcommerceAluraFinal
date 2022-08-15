import { servicioProductos } from "../servicios/servicio-cliente.js";

//creamos linea de cada item producto a cargar
const crearNuevaLinea = (url, categoria, nombre, precio, descripcion) => {
  //la primera linea dond insertamos contenido es un tr...
  const linea = document.createElement("div");
  linea.classList.add("producto__container");

  //backticks ` xxxxx ` comillas de ejecucionv   <img class="productos__card--img" src = "../img/productos/${categoria}s/${url}"  alt = "productos imagen">
  const contenido = ` 
                             <div class="imagen_producto">
                             <img class="producto__card--img" src = "${url}"  alt = "productos imagen">
                             </div>
                        <div class="producto__detalle">
                              <div class="producto__card--info">
                                <p class="producto__card--title">${nombre}</p>
                                <p class="producto__card--price">${precio}</p>
                                <p class="producto__card--detalle">${descripcion} <br> 
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Fugiat cupiditate nobis harum, voluptatibus nulla molestias
                                 voluptate totam commodi asperiores libero id quia laudantium 
                                 voluptatem dolore ipsum enim, non, veritatis eum.</p>
                                </div>
                                <button id="boton-carrito"><i class="fas fa-shopping-cart"></i><span id="contadorCarrito"></span></button>
                                `;
  linea.innerHTML = contenido;
  return linea;
};

//capturamos la url para obtener el id q traemos
const url = new URL(window.location);
//sacamos el id de la url obtenida
const idUrl = url.searchParams.get("id");
//fun para obtener la info deseada con el id q traemos de la lista de clientes...
const obtenerInformacion = () => {
  //validamos si id no existe o no trae nada nos lleve a la pagina de error
  if (idUrl === null) {
    window.location.href = "../paginas/error.html";
  }

  const table = document.querySelector(".producto");
  //fun q trae los datos pasandole el id
  servicioProductos.detalleProducto(idUrl).then((respuesta) => {
    const creaLinea = crearNuevaLinea(
      respuesta.url,
      respuesta.categoria,
      respuesta.nombre,
      respuesta.precio,
      respuesta.descripcion
    );
    table.appendChild(creaLinea);
    const listado = listadoCategoriasRestante(
      respuesta.id,
      respuesta.categoria
    );
  });
};

obtenerInformacion();

//obtenemos el objeto de la categoria elegida menos el prod mostrado en detalle para productos similares
const listadoCategoriasRestante = (id, categoria) => {
  servicioProductos
    .listaProductos()
    .then((data) => {
      //Ordenar x categoria para mostrar (los mas cercanos primero)
      data.sort(function (a, b) {
        var reproA = a.categoria.toLowerCase();
        var reproB = b.categoria.toLowerCase();

        return reproA < reproB ? -1 : reproA < reproB ? 1 : 0;
      });

      const nuevoData = [];
      data.forEach((producto) => {
        //guardamos en un array cada categoria existente dentro de nuestro array
        if (categoria.includes(producto.categoria)) {
          if (id != producto.id) {
            //agregamos la nueva categoria q encontramos a nuestro array
            nuevoData.push(producto);
          }
        }
      });

      const table2 = document.querySelector(".productos__list");
      nuevoData.forEach((producto) => {
        const creaLinea = nuevaLinea(
          producto.url,
          producto.categoria,
          producto.nombre,
          producto.precio,
          producto.id
        );
        table2.appendChild(creaLinea);
      });
    })
    //sino error
    .catch((error) => alert("Ocurrio un error"));
};

//crear linea de productos similares con data
const nuevaLinea = (url, categoria, nombre, precio, id) => {
  const linea = document.createElement("div");
  linea.classList.add("productos__card");
  //backticks ` xxxxx ` comillas de ejecucion   <img class="productos__card--img" src = "../img/productos/${categoria}s/${url}"  alt = "productos imagen"> 
  const contenido = `
                        <img class="productos__card--img" src = "${url}"  alt = "productos imagen"> 
                        <div class="productos__card--info">
                            <p class="productos__card--title">${nombre}</p>
                            <p class="productos__card--price">${precio}</p>
                            <a href ="../paginas/productos_detalle.html?id=${id}"><button class="productos__card-boton">Ver producto</button></a>
                            <button id="boton-carrito"><i class="fas fa-shopping-cart"></i><span id="contadorCarrito"></span></button>
                            </div>
                        </div>`;

  linea.innerHTML = contenido;
  return linea;
};
