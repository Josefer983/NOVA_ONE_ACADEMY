const Historial = {

    render() {

        const titulo = document.getElementById("titulo");
        const contenido = document.getElementById("contenido");

        titulo.textContent = "Historial de Ventas";

        const ventas = JSON.parse(localStorage.getItem("ventas") || "[]");

        let html = "";

        if (ventas.length === 0) {

            html = `
                <div class="card">
                    <h2>📜 Historial de Ventas</h2>
                    <br>
                    <p>No hay ventas registradas.</p>
                </div>
            `;

        } else {

            html = `
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
                                <th></th>

                            </tr>

                        </thead>

                        <tbody>

                            ${ventas.map((venta,index)=>`

                                <tr>

                                    <td>#${venta.folio}</td>

                                    <td>${venta.fecha}</td>

                                    <td>${venta.metodo}</td>

                                    <td>$${venta.total.toFixed(2)}</td>

                                    <td>

                                        <button
                                            class="btn btn-cobrar"
                                            onclick="Historial.ver(${index})">

                                            Ver

                                        </button>

                                    </td>

                                </tr>

                            `).join("")}

                        </tbody>

                    </table>

                </div>
            `;

        }

        contenido.innerHTML = html;

    },

 ver(index){

    const ventas = JSON.parse(localStorage.getItem("ventas") || "[]");

    const venta = ventas[index];

    let productos = "";

    venta.productos.forEach(p=>{

        productos += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.cantidad}</td>
                <td>$${p.precio.toFixed(2)}</td>
                <td>$${(p.precio*p.cantidad).toFixed(2)}</td>
            </tr>
        `;

    });

    const modal = document.createElement("div");

    modal.className = "nova-modal-exito";

    modal.innerHTML = `
        <div class="nova-modal-contenido">

            <h2>📜 Venta #${venta.folio}</h2>

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

            <h3>Total: $${venta.total.toFixed(2)}</h3>

            <div class="acciones">

                <button class="btn btn-cobrar">
                    🖨 Imprimir
                </button>

                <button
                    class="btn btn-vaciar"
                    onclick="this.closest('.nova-modal-exito').remove()">

                    Cerrar

                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

}