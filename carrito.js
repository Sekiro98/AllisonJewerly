// carrito.js completo con cantidades, eliminar y resumen de compra

// Espera a que la página esté completamente cargada
document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  actualizarCarrito();

  window.agregarAlCarrito = function(nombre, precio, imagen) {
  const existente = carrito.find((item) => item.nombre === nombre);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, cantidad: 1, imagen });
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
  <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
    <img src="${item.imagen}" alt="${item.nombre}" style="width: 40px; height: 40px; object-fit: cover; border-radius: 6px;">
    <div>
      <strong>${item.nombre}</strong><br>
      <small>(x${item.cantidad}) - $${item.precio * item.cantidad}</small>
    </div>
    <button onclick="eliminarItem(${index})" style="margin-left:auto;">❌</button>
  </div>
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
