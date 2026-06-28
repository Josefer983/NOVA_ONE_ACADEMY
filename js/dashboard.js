const Dashboard = {

        render() {

                const titulo = document.getElementById("titulo");
                        const contenido = document.getElementById("contenido");

                                titulo.textContent = "Dashboard";

                                        const productos = JSON.parse(localStorage.getItem("productos") || "[]");

                                                const clientes = JSON.parse(localStorage.getItem("clientes") || "[]");

                                                        const compras = JSON.parse(localStorage.getItem("compras") || "[]");

                                                                const ventas = JSON.parse(localStorage.getItem("ventas") || "[]");

                                                                        const totalVentas = ventas.reduce((total, venta) => {

                                                                                    return total + Number(venta.total || 0);

                                                                                            }, 0);

                                                                                                    contenido.innerHTML = `

                                                                                                                <div class="card-grid">

                                                                                                                                <div class="card">

                                                                                                                                                    <h3>📦 Productos</h3>

                                                                                                                                                                        <h2>${productos.length}</h2>

                                                                                                                                                                                        </div>

                                                                                                                                                                                                        <div class="card">

                                                                                                                                                                                                                            <h3>👥 Clientes</h3>

                                                                                                                                                                                                                                                <h2>${clientes.length}</h2>

                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                <div class="card">

                                                                                                                                                                                                                                                                                                    <h3>💰 Ventas</h3>

                                                                                                                                                                                                                                                                                                                        <h2>$${totalVentas.toFixed(2)}</h2>

                                                                                                                                                                                                                                                                                                                                        </div>

                                                                                                                                                                                                                                                                                                                                                        <div class="card">

                                                                                                                                                                                                                                                                                                                                                                            <h3>🛒 Compras</h3>

                                                                                                                                                                                                                                                                                                                                                                                                <h2>${compras.length}</h2>

                                                                                                                                                                                                                                                                                                                                                                                                                </div>

                                                                                                                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                    `;

                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                        };
