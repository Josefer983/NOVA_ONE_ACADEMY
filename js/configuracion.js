const Configuracion = {

    render() {

        const titulo = document.getElementById("titulo");
        const contenido = document.getElementById("contenido");

        titulo.textContent = "Configuración";

        const config = JSON.parse(localStorage.getItem("configuracion") || "{}");

        contenido.innerHTML = `

        <div class="card card-configuracion">

           <h2>⚙ Configuración General</h2>

<p style="color:#666;margin-top:8px;margin-bottom:25px;">

Personaliza Nova POS para adaptarlo a tu negocio.

</p>

            <br>

            <div class="form-group">
                <label>Nombre del negocio</label>
                <input id="cfgNombre" type="text"
                    value="${config.nombre || ""}">
            </div>

            <br>

            <div class="form-group">
                <label>RFC</label>
                <input id="cfgRFC" type="text"
                    value="${config.rfc || ""}">
            </div>

            <br>

            <div class="form-group">
                <label>Teléfono</label>
                <input id="cfgTelefono" type="text"
                    value="${config.telefono || ""}">
            </div>

            <br>

            <div class="form-group">
                <label>Dirección</label>
                <textarea id="cfgDireccion">${config.direccion || ""}</textarea>
            </div>

            <br>

            <div class="form-group">
                <label>Mensaje del ticket</label>
                <textarea id="cfgMensaje">${config.mensaje || "¡Gracias por su compra!"}</textarea>
            </div>

            <br>

            <div class="form-group">

                <label>

                    <input
                        id="cfgAutoPrint"
                        type="checkbox"
                        ${config.autoPrint ? "checked" : ""}>

                    Imprimir ticket automáticamente

                </label>

            </div>

            <br>

<div class="form-group">

    <label>Tipo de negocio</label>

    <select id="cfgTipo">

        <option value="tienda">
            🛒 Tienda
        </option>

        <option value="cafeteria">
            ☕ Cafetería
        </option>

        <option value="restaurante">
            🍽 Restaurante
        </option>

        <option value="outlet">
            🏷 Outlet
        </option>

    </select>

</div>

<br>

            <div class="form-group">

                <label>Tamaño del papel</label>

                <select id="cfgPapel">

                    <option value="58"
                        ${config.papel=="58"?"selected":""}>

                        58 mm

                    </option>

                    <option value="80"
                        ${config.papel=="80"?"selected":""}>

                        80 mm

                    </option>


            <br><br>

            <button
                class="btn btn-cobrar"
                onclick="Configuracion.guardar()">

                💾 Guardar configuración

            </button>

        </div>

        `;

    },

    guardar(){

        const config = {

            nombre: document.getElementById("cfgNombre").value,

            rfc: document.getElementById("cfgRFC").value,

            telefono: document.getElementById("cfgTelefono").value,

            direccion: document.getElementById("cfgDireccion").value,

            mensaje: document.getElementById("cfgMensaje").value,

            autoPrint: document.getElementById("cfgAutoPrint").checked,

tipo: document.getElementById("cfgTipo").value,

            papel: document.getElementById("cfgPapel").value

            
        };

        localStorage.setItem(
            "configuracion",
            JSON.stringify(config)
        );

        alert("✅ Configuración guardada.");

    }

};