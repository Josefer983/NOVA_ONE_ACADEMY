const Historial = {

    render() {

        const titulo = document.getElementById("titulo");
        const contenido = document.getElementById("contenido");

        titulo.textContent = "Historial de Ventas";

        const ventas = JSON.parse(localStorage.getItem("ventas") || "[]");

        if (ventas.length === 0) {

            contenido.innerHTML = `
                <div class="card">
                    <h2>📜 Historial de Ventas</h2>
                    <br>
                    <p>No hay ventas registradas.</p>
                </div>
            `;

            return;
        }

        contenido.innerHTML = `
            <div class="card">

                <h2>📜 Historial de Ventas</h2>

                <br>

                <table class="tabla-historial">

                    <thead>

                        <tr>

                            <th>Folio</th>
                            <th>Fecha</th>
                            <th>Método</th>
                            <th>Total</th>
                            <th>Acciones</th>

                        </tr>

                    </thead>

                    <tbody>

                        ${ventas.map((venta,index)=>`

                            <tr>

                                <td>#${venta.folio}</td>

                                <td>${venta.fecha}</td>

                                <td>${venta.metodo}</td>

                                <td>$${Number(venta.total).toFixed(2)}</td>

                                <td style="display:flex;gap:8px;">

    <button
        class="btn btn-cobrar"
        onclick="Historial.ver(${index})">

        👁 Ver

    </button>

    <button
        class="btn btn-vaciar"
        onclick="Historial.eliminar(${index})">

        🗑 Eliminar

    </button>

</td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>

            </div>
        `;

    },

    ver(index){

        const ventas = JSON.parse(localStorage.getItem("ventas") || "[]");

const venta = ventas[index];

// Guardamos la venta actual para imprimirla
window.ventaActual = venta;

let productos = "";

        venta.productos.forEach(p=>{

            productos += `
                <tr>

                    <td>${p.nombre}</td>

                    <td>${p.cantidad}</td>

                    <td>$${Number(p.precio).toFixed(2)}</td>

                    <td>$${(p.precio*p.cantidad).toFixed(2)}</td>

                </tr>
            `;

        });

        const anterior = document.querySelector(".nova-modal-exito");

        if(anterior){

            anterior.remove();

        }

        const modal = document.createElement("div");

        modal.className = "nova-modal-exito";

        modal.innerHTML = `

            <div class="nova-modal-contenido">

                <div class="icono">📜</div>

                <h2>Venta #${venta.folio}</h2>

                <p><strong>Fecha:</strong> ${venta.fecha}</p>

                <p><strong>Método:</strong> ${venta.metodo}</p>

                <br>

                <table style="width:100%;border-collapse:collapse;">

                    <thead>

                        <tr>

                            <th>Producto</th>

                            <th>Cant.</th>

                            <th>Precio</th>

                            <th>Subtotal</th>

                        </tr>

                    </thead>

                    <tbody>

                        ${productos}

                    </tbody>

                </table>

                <br>

                <h3>Total: $${Number(venta.total).toFixed(2)}</h3>

                <br>

                <div class="acciones">

<button
    class="btn btn-cobrar"
    onclick="Ticket.imprimirVenta(window.ventaActual)">

    🖨 Imprimir

</button>

                    <button
                        class="btn btn-vaciar"
                        onclick="Historial.cerrarModal()">

                        Cerrar

                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(modal);

    },

    eliminar(index){

    if(!confirm("¿Deseas eliminar esta venta?")){
        return;
    }

    const ventas = JSON.parse(localStorage.getItem("ventas") || "[]");

    ventas.splice(index, 1);

    localStorage.setItem("ventas", JSON.stringify(ventas));

    this.render();

},

    cerrarModal(){

        const modal = document.querySelector(".nova-modal-exito");

        if(modal){

            modal.remove();

        }

    }

};