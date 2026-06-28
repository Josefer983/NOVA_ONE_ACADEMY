const App = {

    cargar(modulo){

        const contenido = document.getElementById("contenido");
        const titulo = document.getElementById("titulo");

        switch(modulo){

case "dashboard":

        Dashboard.render();

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
    Configuracion.render();
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
