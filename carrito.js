document.addEventListener("DOMContentLoaded", () => {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  actualizarCarrito();

  function agregarAlCarrito(nombre, precio, imagen) {
    const existente = carrito.find(item => item.nombre === nombre);
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({ nombre, precio, cantidad: 1, imagen });
    }
    guardarCarrito();
    actualizarCarrito();
  }

  function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
  }

  function eliminarItem(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    actualizarCarrito();
  }

  function actualizarCarrito() {
    mostrarToast(`${nombre} agregado al carrito ✅`);
    const contenedor = document.getElementById("carrito-items");
    if (!contenedor) return;

    contenedor.innerHTML = "";
    let total = 0;
    carrito.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("item-carrito");
      div.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" class="item-img">
        <div class="item-info">
          <strong>${item.nombre}</strong><br>
          <small>(x${item.cantidad}) - $${item.precio * item.cantidad}</small>
        </div>
        <button onclick="eliminarItem(${index})" class="item-remove">❌</button>
      `;
      contenedor.appendChild(div);
      total += item.precio * item.cantidad;
    });

    const totalElem = document.getElementById("carrito-total");
    if (totalElem) totalElem.innerText = `Total: $${total}`;
  }

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  // ⚠️ Aquí capturamos los botones después de cargar el DOM
  const botones = document.querySelectorAll(".agregar-carrito");
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      const nombre = boton.dataset.nombre;
      const precio = parseFloat(boton.dataset.precio);
      const imagen = boton.dataset.imagen;
      agregarAlCarrito(nombre, precio, imagen);
    });
  });

  // Expone funciones para botones externos
  window.vaciarCarrito = vaciarCarrito;
  window.eliminarItem = eliminarItem;
});
function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerText = mensaje;
  toast.style.display = "block";

  // Reinicia animaciones
  toast.style.animation = "none";
  void toast.offsetHeight; // Reflow
  toast.style.animation = "fadein 0.5s, fadeout 0.5s 2.5s";

  // Oculta después de 3s
  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
}
