//listar productos
const listaProductos= () => 
//fetch("http://localhost:3000/articulos").then((respuesta) => respuesta.json());
//fetch("http://localhost:3001/articulos").then((respuesta) => respuesta.json());
fetch("https://sl-ecommerce-alura-final.herokuapp.com/articulos").then((respuesta) => respuesta.json());

//fun para eliminar cliente
//le pasamos el id a eliminar y en la url del fetch tmb el id
const eliminarProducto = (id) => {
  return fetch("https://sl-ecommerce-alura-final.herokuapp.com/articulos/${id}",{
 // return fetch(`http://localhost:3001/articulos/${id}`, {
    method: "DELETE",
  });
};

//obtener el detalle del producto por medio del id
//respuesta la retornamos en .json
const detalleProducto = (id) => {
   return fetch("https://sl-ecommerce-alura-final.herokuapp.com/articulos/${id}").then((respuesta)=>
  //return fetch(`http://localhost:3001/articulos/${id}`).then((respuesta) =>
    respuesta.json()
  );
};

//actualizar producto en json server
const actualizarProducto = (
  url,
  categoria,
  nombre,
  precio,
  codigo,
  descripcion,
  id
) => {
  return fetch("https://sl-ecommerce-alura-final.herokuapp.com/${id}",{
  //return fetch(`http://localhost:3001/articulos/${id}`, {
    method: "PUT",
    headers: {
      //encabezado solo para q el server sepa q tipo de archivo recibe
      "Content-Type": "application/json",
    }, //pasamos todos los datos lo generamos automaticamente uuid.v4
    body: JSON.stringify({
      url,
      categoria,
      nombre,
      precio,
      codigo,
      descripcion,
    }), //http trbaja con texto asi q lo pasamos a txt
  })
    .then((respuesta) => console.log(respuesta))
    .catch((err) => console.log(err));
};

//crear producto
const crearProducto = (url, categoria, nombre, precio, codigo, descripcion) => {
  //decimos el metodo a utilizar, sino lo aclaramos usa GET
  //queremos crear usamos POST
  //recibe 2 parametros url donde debe ir + objeto POST
  return fetch("https://sl-ecommerce-alura-final.herokuapp.com/articulos",{
 // return fetch("http://localhost:3001/articulos", {
    method: "POST", //para crear nuevo elemento
    headers: {
      //encabezado solo para q el server sepa q tipo de archivo recibe
      "Content-Type": "application/json",
    }, //pasamos nom y email recibido y id lo generamos automaticamente uuid.v4
    body: JSON.stringify({
      id: uuid.v4(),
      url,
      categoria,
      nombre,
      precio,
      codigo,
      descripcion,
    }), //http trbaja con texto asi q lo pasamos a txt
  });
};

//exportamos client services de controller
export const servicioProductos = {
  listaProductos,
  eliminarProducto,
  detalleProducto,
  actualizarProducto,
  crearProducto,
};

/*
const http= new XMLHttpRequest();
console.log(http);
//CRUD      -Metodos HTTP      
//CREATE    POST
//READ      GET
//UPDATE    PUT/PATCH
//DELETE    DELETE*/
