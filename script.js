const autos = [
  {
    nombre: "BMW i8",
    descripcion: "Híbrido deportivo con diseño futurista y alto rendimiento.",
    precio: "$550,000,000",
    imagen: "https://cdn.motor1.com/images/mgl/lBBmN/s3/bmw-i8-roadster.jpg"
  },
  {
    nombre: "Mercedes AMG GT",
    descripcion: "Motor V8 biturbo, lujo y potencia en un solo modelo.",
    precio: "$720,000,000",
    imagen: "https://cdn.motor1.com/images/mgl/Z3rPo/s3/mercedes-amg-gt-2021.jpg"
  },
  {
    nombre: "Audi R8",
    descripcion: "Superdeportivo con motor V10 y tracción quattro.",
    precio: "$680,000,000",
    imagen: "https://cdn.motor1.com/images/mgl/zPP8n/s3/2021-audi-r8.jpg"
  },
  {
    nombre: "Porsche 911 Carrera",
    descripcion: "Elegancia y potencia alemana con motor bóxer.",
    precio: "$750,000,000",
    imagen: "https://cdn.motor1.com/images/mgl/vkJJn/s3/porsche-911-carrera.jpg"
  },
  {
    nombre: "Lamborghini Huracán EVO",
    descripcion: "Diseño agresivo y sonido inconfundible de un V10.",
    precio: "$950,000,000",
    imagen: "https://cdn.motor1.com/images/mgl/0ZL9b/s3/lamborghini-huracan-evo-2019.jpg"
  }
];

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

const catalogo = document.getElementById("catalogo");
const modal = document.getElementById("modal");
const cerrarModal = document.getElementById("cerrarModal");
const modalImg = document.getElementById("modalImg");
const modalTitulo = document.getElementById("modalTitulo");
const modalDesc = document.getElementById("modalDesc");
const modalPrecio = document.getElementById("modalPrecio");
const btnFavModal = document.getElementById("btnFavModal");
const countFav = document.getElementById("countFav");
const btnFavoritos = document.getElementById("btnFavoritos");
const btnCatalogo = document.getElementById("btnCatalogo");
const contenido = document.getElementById("contenido");

function renderCatalogo() {
  catalogo.innerHTML = "";
  autos.forEach((auto, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${auto.imagen}" alt="${auto.nombre}">
      <h3>${auto.nombre}</h3>
      <p>${auto.descripcion}</p>
      <span>${auto.precio}</span><br>
      <button onclick="verAuto(${index})">Ver</button>
      <button onclick="agregarFavorito(${index})">💖</button>
    `;
    catalogo.appendChild(card);
  });
}

function verAuto(index) {
  const auto = autos[index];
  modalImg.src = auto.imagen;
  modalTitulo.textContent = auto.nombre;
  modalDesc.textContent = auto.descripcion;
  modalPrecio.textContent = auto.precio;
  btnFavModal.onclick = () => agregarFavorito(index);
  modal.style.display = "flex";
}

cerrarModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

function agregarFavorito(index) {
  const auto = autos[index];
  if (!favoritos.find(a => a.nombre === auto.nombre)) {
    favoritos.push(auto);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    actualizarContador();
    alert(`${auto.nombre} añadido a favoritos ❤️`);
  } else {
    alert(`${auto.nombre} ya está en favoritos 💡`);
  }
}

function mostrarFavoritos() {
  catalogo.innerHTML = "";
  if (favoritos.length === 0) {
    catalogo.innerHTML = "<h2>No hay autos en favoritos 😢</h2>";
    return;
  }
  favoritos.forEach((auto, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${auto.imagen}" alt="${auto.nombre}">
      <h3>${auto.nombre}</h3>
      <p>${auto.descripcion}</p>
      <span>${auto.precio}</span><br>
      <button onclick="verAutoFav(${index})">Ver</button>
    `;
    catalogo.appendChild(card);
  });
}

function verAutoFav(index) {
  const auto = favoritos[index];
  modalImg.src = auto.imagen;
  modalTitulo.textContent = auto.nombre;
  modalDesc.textContent = auto.descripcion;
  modalPrecio.textContent = auto.precio;
  btnFavModal.onclick = () => alert("Ya está en favoritos ❤️");
  modal.style.display = "flex";
}

function actualizarContador() {
  countFav.textContent = favoritos.length;
}

btnCatalogo.onclick = renderCatalogo;
btnFavoritos.onclick = mostrarFavoritos;

renderCatalogo();
actualizarContador();
