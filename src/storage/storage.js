export function obtener(clave){

return JSON.parse(localStorage.getItem(clave)) || [];

}

export function guardar(clave,datos){

localStorage.setItem(clave,JSON.stringify(datos));

}
