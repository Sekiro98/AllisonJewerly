// carrito.js completo con cantidades, eliminar y resumen de compra

// Espera a que la página esté completamente cargada
document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  actualizarCarrito();

  window.agregarAlCarrito = function(nombre, precio) {
    const existente = carrito.find((item) => item.nombre === nombre);
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ nombre, precio, cantidad: 1 });
    }
    guardarCarrito();
    actualizarCarrito();
  };

  window.vaciarCarrito = function() {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  };

  window.eliminarItem = function(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
  };

  function actualizarCarrito() {
    const contenedor = document.getElementById("carrito-items");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
      const div = document.createElement("div");
      div.innerHTML = `
        ${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}
        <button onclick="eliminarItem(${index})" style="margin-left:10px;">❌</button>
      `;
      contenedor.appendChild(div);
      total += item.precio * item.cantidad;
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
