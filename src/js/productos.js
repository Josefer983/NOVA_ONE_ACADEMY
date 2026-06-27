window.Productos = {

    lista: JSON.parse(localStorage.getItem("productos") || "[]"),

    editando: -1,

    guardar() {
        localStorage.setItem("productos", JSON.stringify(this.lista));
    },

    render() {

        document.getElementById("titulo").textContent = "Productos";

        document.getElementById("contenido").innerHTML = `

<div class="toolbar">

    <button id="btnNuevo">
        ➕ Nuevo producto
    </button>

    <input
        id="buscar"
        type="text"
        placeholder="🔍 Buscar producto..."
    >

</div>

<table class="tabla">

<thead>

<tr>

<th>SKU</th>
<th>Nombre</th>

<th>Stock</th>

<th>Precio</th>

<th>Acciones</th>

</tr>

</thead>

<tbody id="tablaProductos">

</tbody>

</table>

<div id="modalProducto" class="modal">

<div class="modal-content">

<h2 id="tituloModal">
Nuevo Producto
</h2>

<input
id="nombre"
placeholder="Nombre">

<input
id="stock"
type="number"
placeholder="Stock">

<input
id="precio"
type="number"
placeholder="Precio">

<div class="modal-actions">

<button id="btnCancelar">
Cancelar
</button>

<button id="btnGuardar">
Guardar
</button>

</div>

</div>

</div>

`;

        this.actualizarTabla();

        document
            .getElementById("btnNuevo")
            .onclick = () => {

                this.editando = -1;

                document
                    .getElementById("tituloModal")
                    .textContent = "Nuevo Producto";

                document
                    .getElementById("nombre")
                    .value = "";

                document
                    .getElementById("stock")
                    .value = "";

                document
                    .getElementById("precio")
                    .value = "";

                document
                    .getElementById("modalProducto")
                    .classList
                    .add("active");

            };

        document
            .getElementById("btnCancelar")
            .onclick = () => {

                document
                    .getElementById("modalProducto")
                    .classList
                    .remove("active");

            };

        document
            .getElementById("btnGuardar")
            .onclick = () => {

                const producto = {

                    id: Date.now(),

                sku: "NOV-" + String(this.lista.length + 1).padStart(4,"0"),

                    nombre:
                        document.getElementById("nombre").value,

                    stock:
                        Number(document.getElementById("stock").value),

                    precio:
                        Number(document.getElementById("precio").value)

                };

                if (this.editando === -1) {

                    this.lista.push(producto);

                } else {

                    producto.id =
                        this.lista[this.editando].id;

                    this.lista[this.editando] =
                        producto;

                }

                this.guardar();

                document
                    .getElementById("modalProducto")
                    .classList
                    .remove("active");

                this.render();

            };
document
            .getElementById("buscar")
            .addEventListener("input", (e) => {

                this.actualizarTabla(e.target.value);

            });

    },

    actualizarTabla(filtro = "") {

        const tbody = document.getElementById("tablaProductos");

        if (!tbody) return;

        tbody.innerHTML = "";

        this.lista
            .filter(producto =>
                producto.nombre
                    .toLowerCase()
                    .includes(filtro.toLowerCase())
            )
            .forEach((producto, index) => {

                tbody.innerHTML += `

<tr>

<td>${producto.sku}</td>
<td>${producto.nombre}</td>

<td>${producto.stock}</td>

<td>$${producto.precio.toFixed(2)}</td>

<td>

<button onclick="Productos.editar(${index})">
✏️
</button>

<button onclick="Productos.eliminar(${index})">
🗑️
</button>

</td>

</tr>

`;

            });

    },

    editar(index) {

        this.editando = index;

        const producto = this.lista[index];

        document.getElementById("tituloModal").textContent =
            "Editar Producto";

        document.getElementById("nombre").value =
            producto.nombre;

        document.getElementById("stock").value =
            producto.stock;

        document.getElementById("precio").value =
            producto.precio;

        document
            .getElementById("modalProducto")
            .classList
            .add("active");

    },

    eliminar(index) {

        if (!confirm("¿Eliminar este producto?")) {

            return;

        }

        this.lista.splice(index, 1);

        this.guardar();

        this.actualizarTabla();

    }
};

window.Productos = Productos;
