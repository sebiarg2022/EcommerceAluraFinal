import { servicioProductos } from "../servicios/servicio-cliente.js";

const inputBuscar = document.querySelector(".header__input-search");
const table = document.querySelector(".productos__list");
//Modal
const btnEliminar = document.querySelector("#btnEliminar");
const btnCancelar = document.querySelector("#btnCancelar");
const btn_cruz_cerrar = document.querySelector("#cruz_cerrar");
inputBuscar.value = "";

//creamos linea de cada item producto a cargar
const crearNuevaLinea = (id, url, categoria, nombre, precio, codigo) => {
  const linea = document.createElement("div");
  linea.classList.add("productos__card");
  const div_card_edit = document.createElement("div");
  div_card_edit.classList.add("productos__card-edit");
  const img_icon_del = document.createElement("img");
  img_icon_del.src = "../img/iconos/delete.svg";
  img_icon_del.classList.add("productos__card-icon");
  div_card_edit.appendChild(img_icon_del);
  const img_icon_edit = document.createElement("img");
  img_icon_edit.src = "../img/iconos/edit.svg";
  img_icon_edit.classList.add("productos__card-icon");
  div_card_edit.appendChild(img_icon_edit);

  linea.appendChild(div_card_edit);

  const img_product_card = document.createElement("img");
  img_product_card.classList.add("productos__card--img");
  img_product_card.src = url;
   //"../img/productos/" + categoria + "s/"+url;

  linea.appendChild(img_product_card);

  const div_producto_info = document.createElement("div");
  div_producto_info.classList.add("productos__card--info");

  const p_title = document.createElement("p");
  p_title.classList.add("productos__card--title");
  p_title.innerText = nombre;
  div_producto_info.append(p_title);

  const p_precio = document.createElement("p");
  p_precio.classList.add("productos__card--price");
  p_precio.innerText = precio;
  div_producto_info.append(p_precio);

  const p_codigo = document.createElement("p");
  p_codigo.classList.add("product__card--code");
  p_codigo.innerText = "#" + codigo;
  div_producto_info.append(p_codigo);

  linea.appendChild(div_producto_info);

  img_icon_del.addEventListener("click", () => {
    const prod_eliminar = document.querySelector(".txt_producto");
    prod_eliminar.innerText = nombre;
    console.log(id);
    modal.showModal();
    btnEliminar.addEventListener("click", () => {
      console.log(id);
      servicioProductos
        .eliminarProducto(id)
        .then((respuesta) => {})
        .catch((error) => alert("Ocurrio un error"));
    });

    btnCancelar.addEventListener("click", () => {
      modal.close();
    });

    btn_cruz_cerrar.addEventListener("click", () => {
      modal.close();
    });
  });

  img_icon_edit.addEventListener("click", () => {
    window.location.href = "../paginas/productos_editar.html?id=" + id;
  });
  return linea;
};

const cargarTodo = () => {
  servicioProductos
    .listaProductos()
    .then((data) => {
      //Ordenar x categoria para mostrar (los mas cercanos primero)
      data.sort(function (a, b) {
        var reproA = a.categoria.toLowerCase();
        var reproB = b.categoria.toLowerCase();

        return reproA < reproB ? -1 : reproA < reproB ? 1 : 0;
      });
      //traemos todos los elementos que tienen clase product list
      const table = document.querySelector(".productos__list");
      data.forEach((producto) => {
        const nuevaLinea = crearNuevaLinea(
          producto.id,
          producto.url,
          producto.categoria,
          producto.nombre,
          producto.precio,
          producto.codigo
        );
        table.appendChild(nuevaLinea);
      });
    })
    .catch((error) => alert("Ocurrio un error"));
};

cargarTodo();

inputBuscar.addEventListener("keyup", () => {
  //console.log(buscar);
  //console.log(buscar.value.toLowerCase());
  let texto = inputBuscar.value.toLowerCase();
  if (inputBuscar.value.toLowerCase() == "") {
    table.innerHTML = "";
    cargarTodo();
  } else {
    table.innerHTML = "";
    buscarProducto(texto);
  }
});

const buscarProducto = (texto) => {
  servicioProductos.listaProductos().then((data) => {
    let cont = 0;

    data.forEach(({ id, url, categoria, nombre, precio, codigo }) => {
      if (nombre.toLowerCase().indexOf(texto) !== -1) {
        const nuevaLinea =
          crearNuevaLinea(id, url, categoria, nombre, precio, codigo) /
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
