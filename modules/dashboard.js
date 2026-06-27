window.dashboardModule = function () {

    document.getElementById("titulo").textContent = "Dashboard";

    document.getElementById("contenido").innerHTML = `
    
    <div class="card-grid">

        <div class="card">
            <h3>Productos</h3>
            <h2 id="totalProductos">0</h2>
        </div>

        <div class="card">
            <h3>Clientes</h3>
            <h2 id="totalClientes">0</h2>
        </div>

        <div class="card">
            <h3>Ventas</h3>
            <h2 id="totalVentas">$0.00</h2>
        </div>

        <div class="card">
            <h3>Compras</h3>
            <h2 id="totalCompras">0</h2>
        </div>

    </div>
    `;

    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    const compras = JSON.parse(localStorage.getItem("compras")) || [];
    const ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    document.getElementById("totalProductos").textContent = productos.length;
    document.getElementById("totalClientes").textContent = clientes.length;
    document.getElementById("totalCompras").textContent = compras.length;

    let total = ventas.reduce((suma, venta) => suma + Number(venta.total || 0), 0);

    document.getElementById("totalVentas").textContent =
        new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN"
        }).format(total);

}
