// carrito.js
let carrito = [];

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

function actualizarCarrito() {
  const contenedor = document.getElementById("carrito-items");
  contenedor.innerHTML = "";

  let total = 0;

  carrito.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerText = `${item.nombre} - $${item.precio}`;
    contenedor.appendChild(div);
    total += item.precio;
  });

  document.getElementById("carrito-total").innerText = `Total: $${total}`;
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}
