const API_URL = "https://script.google.com/macros/s/AKfycbxwHZqiHCXGeDqgTNIEKsejBTX_85c6cyNvqVHyXZoPf_ewndD9peMNyRSNltmWXWX-/exec";

function cargarInventario() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const tbody = document.querySelector("#tabla-inventario tbody");
      tbody.innerHTML = "";
      data.forEach(item => {
        tbody.innerHTML += `
          <tr>
            <td>${item.id}</td>
            <td>${item.producto}</td>
            <td>${item.cantidad}</td>
            <td>${item.precio}</td>
          </tr>
        `;
      });
    });
}

document.getElementById("form-agregar").addEventListener("submit", function(e) {
  e.preventDefault();
  
  const nuevo = {
    id: document.getElementById("id").value,
    producto: document.getElementById("producto").value,
    cantidad: document.getElementById("cantidad").value,
    precio: document.getElementById("precio").value
  };

  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(nuevo)
  })
  .then(res => res.json())
  .then(() => {
    cargarInventario();
    this.reset();
  });
});

cargarInventario();
