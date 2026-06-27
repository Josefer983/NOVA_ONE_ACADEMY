const Modal = {

    abrir(id){

        const modal=document.getElementById(id);

        if(modal){
            modal.classList.add("active");
        }

    },

    cerrar(id){

        const modal=document.getElementById(id);

        if(modal){
            modal.classList.remove("active");
        }

    }

};

window.Modal=Modal;
