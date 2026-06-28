const Ventas = {

    ticket: [],

render() {

    
    const titulo = document.getElementById("titulo");
    const contenido = document.getElementById("contenido");

    titulo.textContent = "Caja";

    const productos = JSON.parse(localStorage.getItem("productos") || "[]");

    contenido.innerHTML = `
    <div class="card">

        <div style="display:grid;grid-template-columns:3fr 1fr;gap:25px;align-items:flex-start;">

            <!-- PRODUCTOS -->
            <div>

                <div class="productos-grid">

                    ${
                        productos.length === 0
                        ? "<p>No hay productos registrados.</p>"
                        : productos.map(p => `
                            <div class="producto-card">

                                <div class="producto-icono">📦</div>

                                <h3>${p.nombre}</h3>

                                <p>$${p.precio}</p>

                                <button
                                    class="btn-agregar"
                                    onclick="Ventas.agregar('${p.nombre}', ${p.precio})">
                                    Agregar
                                </button>

                            </div>
                        `).join("")
                    }

                </div>

            </div>

            <!-- TICKET -->
            <div class="card">

                <h3>🧾 Ticket</h3>

                <div id="ticket"></div>

                <hr>

                <h2 id="total">$0.00</h2>

                <button class="btn btn-vaciar" onclick="Ventas.vaciar()">
                    🗑 Vaciar Ticket
                </button>

                <button class="btn btn-comanda">
                    🖨 Comanda
                </button>

                <button class="btn btn-cobrar" onclick="Ventas.abrirCobro()">
                    💳 Cobrar
                </button>
<div id="modalCobro" class="modal">

    <div class="modal-contenido">

        <h2>💳 Cobrar Venta</h2>

        <h3 id="modalTotal">$0.00</h3>

        <label>Método de pago</label>

        <select id="metodoPago">
            <option>Efectivo</option>
            <option>Tarjeta</option>
            <option>Transferencia</option>
        </select>

        <label>Recibido</label>

        <input
            type="number"
            id="recibido"
            placeholder="0.00"
            oninput="Ventas.calcularCambio()">

        <h3>
            Cambio:
            <span id="cambio">$0.00</span>
        </h3>

        <div class="acciones-modal">

            <button class="btn btn-vaciar"
                onclick="Ventas.cerrarCobro()">
                Cancelar
            </button>

            <button class="btn btn-cobrar"
                onclick="Ventas.confirmarCobro()">
                Confirmar
            </button>

        </div>

    </div>

</div>

            </div>

        </div>

    </div>
    `;

    this.actualizar();

},

agregar(nombre, precio){

    const existe = this.ticket.find(p => p.nombre === nombre);

    if(existe){
        existe.cantidad++;
    }else{
        this.ticket.push({
            nombre,
            precio,
            cantidad:1
        });
    }

    this.actualizar();
},

eliminar(i){

    if(this.ticket[i].cantidad > 1){
        this.ticket[i].cantidad--;
    }else{
        this.ticket.splice(i,1);
    }

    this.actualizar();
},

vaciar(){

    this.ticket = [];

    this.actualizar();
},

  abrirCobro(){

    const total = this.ticket.reduce(
        (s,p)=>s+(p.precio*p.cantidad),
        0
    );

    this.totalCobro = total;

    document.getElementById("modalTotal").textContent =
        "$" + total.toFixed(2);

    document.getElementById("recibido").value = "";

    document.getElementById("cambio").textContent = "$0.00";

    document.getElementById("modalCobro").style.display = "flex";

},

cerrarCobro(){

    document.getElementById("modalCobro").style.display = "none";

},

calcularCambio(){

    const recibido =
        Number(document.getElementById("recibido").value);

    const cambio = recibido - this.totalCobro;

    document.getElementById("cambio").textContent =
        "$" + Math.max(cambio,0).toFixed(2);

},

confirmarCobro(){

    if(this.ticket.length===0){
        alert("No hay productos en el ticket.");
        return;
    }

    const metodo=document.getElementById("metodoPago").value;

    const ventas=JSON.parse(localStorage.getItem("ventas")||"[]");

    const venta={

        folio:ventas.length+1,

        fecha:new Date().toLocaleString(),

        metodo:metodo,

        total:this.totalCobro,

        productos:[...this.ticket]

    };

    ventas.push(venta);

    localStorage.setItem("ventas",JSON.stringify(ventas));

    this.descontarInventario();

    this.vaciar();

    this.cerrarCobro();

    this.mostrarVentaCompletada(venta);

},

mostrarVentaCompletada(venta){

    const anterior = document.querySelector(".nova-modal-exito");

    if(anterior){
        anterior.remove();
    }

    const modal = document.createElement("div");

    modal.className = "nova-modal-exito";

    modal.innerHTML = `
        <div class="nova-modal-contenido">

            <div class="icono">✅</div>

            <h2>Venta completada</h2>

            <p>La venta se registró correctamente.</p>

            <div class="info">

                <p><strong>Folio:</strong> #${venta.folio}</p>

                <p><strong>Total:</strong> $${venta.total.toFixed(2)}</p>

                <p><strong>Método:</strong> ${venta.metodo}</p>

                <p><strong>Fecha:</strong> ${venta.fecha}</p>

            </div>

            <div class="acciones">

                <button class="btn btn-cobrar"
                    onclick="Ventas.cerrarModalVenta()">
                    Nueva venta
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

},

cerrarModalVenta(){

    const modal = document.querySelector(".nova-modal-exito");

    if(modal){
        modal.remove();
    }

},

descontarInventario(){

    let productos=JSON.parse(localStorage.getItem("productos")||"[]");

    this.ticket.forEach(item=>{

        const producto=productos.find(p=>p.nombre===item.nombre);

        if(producto){

            producto.stock-=item.cantidad;

            if(producto.stock<0){
                producto.stock=0;
            }

        }

    });

    localStorage.setItem("productos",JSON.stringify(productos));

},

    actualizar(){

        const lista=document.getElementById("ticket");

        if(!lista)return;

        let html="";

        let total=0;

        this.ticket.forEach((p,i)=>{

            let subtotal=p.precio*p.cantidad;

            total+=subtotal;

           html += `
<div class="ticket-item">

    <div class="ticket-info">
        <strong>${p.nombre}</strong><br>
        <small>${p.cantidad} × $${p.precio}</small>
    </div>

    <div class="ticket-total">
        <b>$${subtotal}</b>
    </div>

    <button class="btn-eliminar"
        onclick="Ventas.eliminar(${i})">
        ✕
    </button>

</div>
`;

        });

        if(html===""){

            html="<p>No hay productos.</p>";

        }

        lista.innerHTML=html;

        document.getElementById("total").textContent="$"+total.toFixed(2);

    }

};
