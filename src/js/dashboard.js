function obtener(clave){

    return JSON.parse(localStorage.getItem(clave)) || [];

}

function actualizarDashboard(){

    const productos = obtener("productos").length;

    const clientes = obtener("clientes").length;

    const compras = obtener("compras").length;

    const ventas = obtener("ventas") || [];

    const totalVentas = ventas.reduce((total,venta)=>{

        return total + Number(venta.total || 0);

    },0);

    const ids={

        productos:"productos",

        clientes:"clientes",

        compras:"compras",

        ventas:"ventas"

    };

    Object.keys(ids).forEach(id=>{

        const elemento=document.getElementById(id);

        if(!elemento) return;

        switch(id){

            case "productos":
                elemento.textContent=productos;
                break;

            case "clientes":
                elemento.textContent=clientes;
                break;

            case "compras":
                elemento.textContent=compras;
                break;

            case "ventas":
                elemento.textContent="$"+totalVentas.toFixed(2);
                break;

        }

    });

}

document.addEventListener("DOMContentLoaded",actualizarDashboard);
