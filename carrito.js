// Recuperar carrito del localStorage al cargar
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarCarrito();

// Agregar producto al carrito
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  guardarCarrito();
  actualizarCarrito();
}

// Mostrar carrito visualmente
function actualizarCarrito() {
  const contenedor = document.getElementById("carrito-items");
  if (!contenedor) return; // Evita error si el contenedor no existe aún

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

// Vaciar carrito
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

// Guardar carrito en localStorage
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
