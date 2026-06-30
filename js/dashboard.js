const Dashboard = {

    render(){

        const contenido = document.getElementById("contenido");
        const titulo = document.getElementById("titulo");
        const subtitulo = document.getElementById("subtitulo");

        // Cambiar título de la topbar
        titulo.textContent = "Dashboard";
        subtitulo.textContent = "Resumen general de tu negocio";

        // Datos almacenados
        const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
        const productos = JSON.parse(localStorage.getItem("productos")) || [];
        const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
        const compras = JSON.parse(localStorage.getItem("compras")) || [];

        // Estadísticas
        const totalVentas = ventas.reduce((suma, venta) => {
            return suma + Number(venta.total || 0);
        }, 0);

        const totalProductos = productos.length;
        const totalClientes = clientes.length;
        const totalCompras = compras.length;

        contenido.innerHTML = `

            ${this.renderBanner()}

            ${this.renderKPIs(
                totalVentas,
                totalProductos,
                totalClientes,
                totalCompras
            )}



            <div class="dashboard-row">

                ${this.renderCaja()}

                ${this.renderUltimasVentas(ventas)}

            </div>

            ${this.renderAcciones()}

        `;

        setTimeout(()=>{

    document.querySelectorAll(".quick-actions button").forEach(btn=>{

        btn.onclick=()=>{

            App.cargar(btn.dataset.module);

        };

    });

},0);

        renderBanner(){

        const hora = new Date().getHours();

        let saludo = "Bienvenido";

        if(hora >= 6 && hora < 12){

            saludo = "Buenos días";

        }else if(hora >= 12 && hora < 19){

            saludo = "Buenas tardes";

        }else{

            saludo = "Buenas noches";

        }

        return `

        <section class="dashboard-banner">

            <div class="banner-info">

                <span class="banner-label">
                    NOVA ONE BUSINESS
                </span>

                <h2>

                    ${saludo}

                    <span class="banner-user">
                        Administrador 👋
                    </span>

                </h2>

                <p>

                    Bienvenido al centro de control de tu negocio.

                    Administra ventas, productos, clientes y reportes desde un solo lugar.

                </p>

            </div>

            <div class="banner-actions">

                <button class="nova-btn-primary">

                    <i class="fa-solid fa-cash-register"></i>

                    Nueva venta

                </button>

                <button class="nova-btn">

                    <i class="fa-solid fa-box"></i>

                    Productos

                </button>

            </div>

        </section>

        `;

    },

        renderKPIs(
        totalVentas,
        totalProductos,
        totalClientes,
        totalCompras
    ){

        return `

        <section class="dashboard-grid">

            <div class="nova-card kpi-card">

                <div class="kpi-info">

                    <span class="kpi-title">

                        Ventas Totales

                    </span>

                    <span class="kpi-value">

                        $${totalVentas.toLocaleString()}

                    </span>

                    <span class="kpi-change">

                        <i class="fa-solid fa-arrow-trend-up"></i>

                        Ventas acumuladas

                    </span>

                </div>

                <div class="kpi-icon">

                    <i class="fa-solid fa-sack-dollar"></i>

                </div>

            </div>


            <div class="nova-card kpi-card">

                <div class="kpi-info">

                    <span class="kpi-title">

                        Productos

                    </span>

                    <span class="kpi-value">

                        ${totalProductos}

                    </span>

                    <span class="kpi-change">

                        <i class="fa-solid fa-box"></i>

                        En catálogo

                    </span>

                </div>

                <div class="kpi-icon">

                    <i class="fa-solid fa-boxes-stacked"></i>

                </div>

            </div>


            <div class="nova-card kpi-card">

                <div class="kpi-info">

                    <span class="kpi-title">

                        Clientes

                    </span>

                    <span class="kpi-value">

                        ${totalClientes}

                    </span>

                    <span class="kpi-change">

                        <i class="fa-solid fa-user-group"></i>

                        Registrados

                    </span>

                </div>

                <div class="kpi-icon">

                    <i class="fa-solid fa-users"></i>

                </div>

            </div>


            <div class="nova-card kpi-card">

                <div class="kpi-info">

                    <span class="kpi-title">

                        Compras

                    </span>

                    <span class="kpi-value">

                        ${totalCompras}

                    </span>

                    <span class="kpi-change">

                        <i class="fa-solid fa-truck"></i>

                        Registradas

                    </span>

                </div>

                <div class="kpi-icon">

                    <i class="fa-solid fa-cart-shopping"></i>

                </div>

            </div>

        </section>

        `;

    },

        renderCaja(){

        return `

        <div class="nova-card">

            <div class="card-header">

                <div>

                    <h3 class="card-title">
                        Caja Actual
                    </h3>

                    <p class="card-subtitle">
                        Estado de la caja
                    </p>

                </div>

                <span class="status-open">

                    <i class="fa-solid fa-circle"></i>

                    Abierta

                </span>

            </div>

            <div class="cash-card">

                <h2>$0.00</h2>

                <span>Saldo disponible</span>

            </div>

            <div class="cash-actions">

                <button class="nova-btn-primary">

                    <i class="fa-solid fa-cash-register"></i>

                    Ir al POS

                </button>

            </div>

        </div>

        `;

    },


    renderUltimasVentas(ventas){

        const ultimas = ventas.slice(-5).reverse();

        return `

        <div class="nova-card">

            <div class="card-header">

                <div>

                    <h3 class="card-title">
                        Últimas Ventas
                    </h3>

                    <p class="card-subtitle">
                        Movimientos recientes
                    </p>

                </div>

            </div>

            <div class="sales-list">

                ${

                    ultimas.length
                    ?

                    ultimas.map((venta,index)=>`

                        <div class="sale-item">

                            <div>

                                <strong>

                                    Venta #${ultimas.length-index}

                                                                </strong>

                                <p>

                                    ${venta.fecha || "Sin fecha"}

                                </p>

                            </div>

                            <div class="sale-total">

                                $${Number(venta.total || 0).toLocaleString()}

                            </div>

                        </div>

                    `).join("")

                    :

                    `

                    <div class="empty-sales">

                        <i class="fa-solid fa-receipt"></i>

                        <p>

                            Aún no hay ventas registradas.

                        </p>

                    </div>

                    `

                }

            </div>

        </div>

        `;

    },

    renderAcciones(){

        return `

        <section class="nova-card">

            <div class="card-header">

                <div>

                    <h3 class="card-title">

                        Acciones rápidas

                    </h3>

                    <p class="card-subtitle">

                        Accede rápidamente a las funciones principales.

                    </p>

                </div>

            </div>

            <div class="quick-actions">

                <button class="nova-btn-primary" data-module="ventas">

                    <i class="fa-solid fa-cash-register"></i>

                    Nueva Venta

                </button>

                <button class="nova-btn" data-module="productos">

                    <i class="fa-solid fa-box"></i>

                    Productos

                </button>

                <button class="nova-btn" data-module="clientes">

                    <i class="fa-solid fa-users"></i>

                    Clientes

                </button>

                <button class="nova-btn" data-module="reportes">

                    <i class="fa-solid fa-chart-line"></i>

                    Reportes

                </button>

            </div>

        </section>

        `;

    }
    
};

