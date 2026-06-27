export function crearLayout(titulo, contenido){

return `
<div class="dashboard">

<aside class="sidebar">

<h2>NOVA ONE</h2>

<nav>

<a href="#" data-module="dashboard">🏠 Dashboard</a>

<a href="#" data-module="productos">📦 Productos</a>

<a href="#" data-module="ventas">🛒 Ventas</a>

<a href="#" data-module="clientes">👥 Clientes</a>

<a href="#" data-module="compras">🚚 Compras</a>

<a href="#" data-module="reportes">📊 Reportes</a>

<a href="#" data-module="configuracion">⚙ Configuración</a>

</nav>

</aside>

<main class="content">

<header class="topbar">

<h1>${titulo}</h1>

<button id="themeBtn">
🌙
</button>

</header>

${contenido}

</main>

</div>
`;

}
