const App = {

    cargar(modulo){

        const contenido = document.getElementById("contenido");
        const titulo = document.getElementById("titulo");

        switch(modulo){

            case "dashboard":

                titulo.textContent="Dashboard";

                contenido.innerHTML=`
                <div class="card-grid">

                    <div class="card">
                        <h3>Productos</h3>
                        <h2>${JSON.parse(localStorage.getItem("productos")||"[]").length}</h2>
                    </div>

                    <div class="card">
                        <h3>Clientes</h3>
                        <h2>${JSON.parse(localStorage.getItem("clientes")||"[]").length}</h2>
                    </div>

                    <div class="card">
                        <h3>Ventas</h3>
                        <h2>$0.00</h2>
                    </div>

                    <div class="card">
                        <h3>Compras</h3>
                        <h2>${JSON.parse(localStorage.getItem("compras")||"[]").length}</h2>
                    </div>

                </div>`;
            break;

            case "productos":

                titulo.textContent="Productos";

                contenido.innerHTML=`
                    <h2>Módulo de Productos</h2>
                    <br>
                    <button id="nuevoProducto">➕ Nuevo producto</button>
                    <br><br>
                    <div id="listaProductos"></div>
                `;
            break;

            case "ventas":
            Ventas.render();
            break;

case "historial":
    Historial.render();
break;

            case "clientes":
                titulo.textContent="Clientes";
                contenido.innerHTML="<h2>🚧 Próximamente...</h2>";
            break;

            case "compras":
                titulo.textContent="Compras";
                contenido.innerHTML="<h2>🚧 Próximamente...</h2>";
            break;

            case "reportes":
                titulo.textContent="Reportes";
                contenido.innerHTML="<h2>🚧 Próximamente...</h2>";
            break;

            case "configuracion":
                titulo.textContent="Configuración";
                contenido.innerHTML="<h2>🚧 Próximamente...</h2>";
            break;

        }

    }

};

document.querySelectorAll("#sidebar a").forEach(link=>{

    link.onclick=(e)=>{

        e.preventDefault();

        App.cargar(link.dataset.module);

    }

});

App.cargar("dashboard");
