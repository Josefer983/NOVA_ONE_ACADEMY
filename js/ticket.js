const Ticket = {

    imprimirVenta(venta){

        const ventana = window.open("", "_blank", "width=350,height=700");

        let productos = "";

        venta.productos.forEach(p=>{

            productos += `
                <tr>
                    <td>${p.cantidad}</td>
                    <td>${p.nombre}</td>
                    <td style="text-align:right;">
                        $${(p.precio*p.cantidad).toFixed(2)}
                    </td>
                </tr>
            `;

        });

        ventana.document.write(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>Ticket</title>

<style>

body{

    font-family:Arial,sans-serif;

    width:280px;

    margin:auto;

    padding:15px;

    font-size:13px;

}

h2{

    text-align:center;

    margin-bottom:5px;

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

    padding:3px 0;

}

.total{

    font-size:18px;

    font-weight:bold;

    text-align:right;

}

.footer{

    text-align:center;

    margin-top:20px;

    font-size:12px;

}

</style>

</head>

<body>

<h2>NOVA POS</h2>

<div style="text-align:center;">
Mi Negocio
</div>

<hr>

<b>Venta #${venta.folio}</b>

<br>

${venta.fecha}

<hr>

<table>

${productos}

</table>

<hr>

<div class="total">

TOTAL

<br>

$${venta.total.toFixed(2)}

</div>

<hr>

Método:

${venta.metodo}

<div class="footer">

¡Gracias por su compra!

</div>

<script>

window.onload=()=>{

    window.print();

}

<\/script>

</body>

</html>

`);

        ventana.document.close();

    }

};