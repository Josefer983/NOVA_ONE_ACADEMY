const Ventas = {

    ticket: [],

    render() {

        const titulo = document.getElementById("titulo");
        const contenido = document.getElementById("contenido");

        titulo.textContent = "Caja";

        contenido.innerHTML = `
        <div class="card">

            <div style="display:flex;gap:10px;overflow:auto;margin-bottom:20px;">
            ${(() => {

                    const productos = JSON.parse(localStorage.getItem("productos") || "[]");

                        if (productos.length === 0) {
                                return "<p>No hay productos registrados.</p>";
                                    }

                                
                                                return productos.map(p => `
<div class="producto-card">

<div class="producto-icono">📦</div>

<h3>${p.nombre}</h3>

<p>$${p.precio}</p>

<button
class="btn-agregar"
onclick="Ventas.agregar('${p.nombre}',${p.precio})">
Agregar
</button>

</div>
`).join("");

                                                                                    })()}
            
            </div>

            <div style="display:grid;grid-template-columns:2fr 1fr;gap:20px;">

                <div></div>

                <div class="card">

                    <h3>🧾 Ticket</h3>

                    <div id="ticket"></div>

                    <hr>

                    <h2 id="total">$0.00</h2>

                    <button class="btn" onclick="Ventas.vaciar()">
                    🗑 Vaciar Ticket
                    </button>

                    <br><br>

                    <button class="btn">
                    🖨 Comanda
                    </button>

                    <br><br>

                    <button class="btn">
                    💳 Cobrar
                    </button>

                </div>

            </div>

        </div>
        `;

        this.actualizar();

    },

    agregar(nombre,precio){

        let existe=this.ticket.find(p=>p.nombre===nombre);

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

        this.ticket=[];

        this.actualizar();

    },

    actualizar(){

        const lista=document.getElementById("ticket");

        if(!lista)return;

        let html="";

        let total=0;

        this.ticket.forEach((p,i)=>{

            let subtotal=p.precio*p.cantidad;

            total+=subtotal;

            html+=`
            <p>

            ${p.nombre}

            x${p.cantidad}

            <b>$${subtotal}</b> <button onclick='Ventas.eliminar(${i})'>❌</button>

            </p>
            `;

        });

        if(html===""){

            html="<p>No hay productos.</p>";

        }

        lista.innerHTML=html;

        document.getElementById("total").textContent="$"+total.toFixed(2);

    }

};
