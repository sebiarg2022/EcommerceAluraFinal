import { servicioProductos } from "../servicios/servicio-cliente.js";

const urlProducto = document.querySelector("#urlProducto");
const categoriaProducto = document.querySelector("#categoriaProducto");
const nombreProducto = document.querySelector("#nombreProducto");
const precioProducto = document.querySelector("#precioProducto");
const codigoProducto = document.querySelector("#codigoProducto");
const descripcionProducto = document.querySelector("#descripcionProducto");
const btn_editar_producto = document.querySelector(".editar__producto__button");

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

  //fun q trae los datos pasandole el id
  servicioProductos.detalleProducto(idUrl).then((articulo) => {
    
    urlProducto.value = articulo.url;
    categoriaProducto.value = articulo.categoria.toLowerCase();
    nombreProducto.value = articulo.nombre;
    precioProducto.value = articulo.precio;
    codigoProducto.value = articulo.codigo;
    descripcionProducto.value = articulo.descripcion;
  });
};

obtenerInformacion();

btn_editar_producto.addEventListener("click", (evento) => {
  evento.preventDefault();
  servicioProductos
    .actualizarProducto(
      urlProducto.value,
      categoriaProducto.value,
      nombreProducto.value,
      precioProducto.value,
      codigoProducto.value,
      descripcionProducto.value,
      idUrl
    )
    .then(() => {
      window.location.href = "edicion_concluida.html";
    });
});
