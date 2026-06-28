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
                <li>

                    ${p.cantidad} × ${p.nombre}

                    <strong>

                        $${(p.precio*p.cantidad).toFixed(2)}

                    </strong>

                </li>
            `;

        });

        alert(

`VENTA #${venta.folio}

Fecha:
${venta.fecha}

Método:
${venta.metodo}

----------------------

${venta.productos.map(p=>`${p.cantidad} x ${p.nombre}`).join("\n")}

----------------------

TOTAL:
$${venta.total.toFixed(2)}
`

        );

    }

};