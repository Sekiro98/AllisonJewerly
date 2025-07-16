document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  actualizarCarrito();

  window.agregarAlCarrito = function(nombre, precio) {
    carrito.push({ nombre, precio });
    guardarCarrito();
    actualizarCarrito();
  };

  window.vaciarCarrito = function() {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  };

  function actualizarCarrito() {
    const contenedor = document.getElementById("carrito-items");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach((item) => {
      const div = document.createElement("div");
      div.innerText = `${item.nombre} - $${item.precio}`;
      contenedor.appendChild(div);
      total += item.precio;
    });

    const totalElem = document.getElementById("carrito-total");
    if (totalElem) {
      totalElem.innerText = `Total: $${total}`;
    }
  }

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
});
