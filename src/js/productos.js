let productos = JSON.parse(localStorage.getItem("productos")) || [];

const tabla = document.querySelector("#tablaProductos tbody");

const modal = document.getElementById("modalProducto");
const btnNuevo = document.getElementById("nuevoProducto");
const btnCerrar = document.getElementById("cerrarModal");
const btnCancelar = document.getElementById("cancelarProducto");
const btnGuardar = document.getElementById("guardarProducto");

const txtNombre = document.getElementById("nombreProducto");
const txtStock = document.getElementById("stockProducto");
const txtPrecio = document.getElementById("precioProducto");

let indiceEditar = null;

function guardarLocal() {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function abrirModal() {
    modal.classList.add("active");
}

function cerrarModal() {
    modal.classList.remove("active");
    txtNombre.value = "";
    txtStock.value = "";
    txtPrecio.value = "";
    indiceEditar = null;
}

btnNuevo.onclick = abrirModal;
btnCerrar.onclick = cerrarModal;
btnCancelar.onclick = cerrarModal;

btnGuardar.onclick = () => {

    const nombre = txtNombre.value.trim();
    const stock = Number(txtStock.value);
    const precio = Number(txtPrecio.value);

    if (!nombre) {
        alert("Escribe el nombre del producto.");
        return;
    }

    if (indiceEditar === null) {

        productos.push({
            id: Date.now(),
            nombre,
            stock,
            precio
        });

    } else {

        productos[indiceEditar].nombre = nombre;
        productos[indiceEditar].stock = stock;
        productos[indiceEditar].precio = precio;

    }

    guardarLocal();
    renderizar();
    cerrarModal();

};

function editar(index){

    indiceEditar = index;

    txtNombre.value = productos[index].nombre;
    txtStock.value = productos[index].stock;
    txtPrecio.value = productos[index].precio;

    abrirModal();

}

function eliminar(index){

    if(!confirm("¿Eliminar producto?")) return;

    productos.splice(index,1);

    guardarLocal();

    renderizar();

}

function renderizar(){

    tabla.innerHTML="";

    productos.forEach((producto,index)=>{

        tabla.innerHTML += `
        <tr>

            <td>${producto.id}</td>

            <td>${producto.nombre}</td>

            <td>${producto.stock}</td>

            <td>$${producto.precio.toFixed(2)}</td>

            <td>

                <button onclick="editar(${index})">✏️</button>

                <button onclick="eliminar(${index})">🗑️</button>

            </td>

        </tr>
        `;

    });

}

renderizar();

const buscador = document.getElementById("buscarProducto");

if (buscador) {

    buscador.addEventListener("input", () => {

        const texto = buscador.value.toLowerCase();

        const filas = tabla.querySelectorAll("tr");

        filas.forEach(fila => {

            const nombre = fila.children[1].textContent.toLowerCase();

            fila.style.display = nombre.includes(texto)
                ? ""
                : "none";

        });

    });

}

