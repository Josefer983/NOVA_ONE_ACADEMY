document.addEventListener("DOMContentLoaded",()=>{

    if(window.App){

        App.cargar("dashboard");

    }

});


document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll("#sidebar a").forEach(link => {

        link.addEventListener("click", function(e){

            e.preventDefault();

            const modulo = this.dataset.module;

            if(modulo === "productos"){
                Productos.render();
            }

            if(modulo === "dashboard"){
                location.reload();
            }

        });

    });

});
