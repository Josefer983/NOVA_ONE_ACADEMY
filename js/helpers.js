const Helpers = {

    id() {
        return Date.now() + Math.floor(Math.random() * 1000);
    },

    money(valor) {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN"
        }).format(valor);
    },

    fecha() {
        return new Date().toLocaleString("es-MX");
    },

    qs(selector) {
        return document.querySelector(selector);
    },

    qsa(selector) {
        return document.querySelectorAll(selector);
    },

    toast(mensaje) {
        alert(mensaje);
    }

};

window.Helpers = Helpers;
