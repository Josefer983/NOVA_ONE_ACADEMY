const Ticket = {

    imprimirVenta(venta){

    // Si no recibe una venta, usa la última abierta en el historial
    venta = venta || window.ventaActual;

    if(!venta){
        alert("No se encontró la venta.");
        return;
        }

        const ventana = window.open("", "_blank", "width=350,height=700");

        let productos = "";

        venta.productos.forEach(p=>{

            productos += `
                <tr>
                    <td>${p.cantidad}</td>
                    <td>${p.nombre}</td>
                    <td style="text-align:right;">
                        $${(p.precio * p.cantidad).toFixed(2)}
                    </td>
                </tr>
            `;

        });

        ventana.document.write(`

<!DOCTYPE html>
<html lang="es">

<head>

<meta charset="UTF-8">

<title>Ticket de Venta</title>

<style>

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{

    font-family:Arial,Helvetica,sans-serif;
    width:280px;
    margin:auto;
    padding:15px;
    font-size:13px;
    color:#000;

}

h2{

    text-align:center;
    margin-bottom:5px;

}

.centro{

    text-align:center;

}

hr{

    border:none;
    border-top:1px dashed #000;
    margin:10px 0;

}

table{

    width:100%;
    border-collapse:collapse;

}

td{

    padding:4px 0;

}

.total{

    text-align:right;
    font-size:18px;
    font-weight:bold;

}

.footer{

    margin-top:20px;
    text-align:center;
    font-size:12px;

}

</style>

</head>

<body>

<h2>NOVA POS</h2>

<div class="centro">

Mi Negocio

<br>

Gracias por su compra

</div>

<hr>

<b>Folio:</b> #${venta.folio}

<br>

<b>Fecha:</b>

${venta.fecha}

<hr>

<table>

${productos}

</table>

<hr>

<div class="total">

TOTAL

<br>

$${Number(venta.total).toFixed(2)}

</div>

<hr>

<b>Método:</b>

${venta.metodo}

<hr>

<div class="footer">

¡Gracias por su compra!

<br>

Powered by Nova POS

</div>

<script>

window.onload = () => {

    window.print();

};

<\/script>

</body>

</html>

        `);

        ventana.document.close();

    },

    imprimirDesdeHistorial(index){

        const ventas = JSON.parse(localStorage.getItem("ventas") || "[]");

        if(index < 0 || index >= ventas.length){

            alert("Venta no encontrada.");

            return;

        }

        this.imprimirVenta(ventas[index]);

    }

};