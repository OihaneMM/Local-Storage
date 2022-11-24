const nuevaMision = document.querySelector("#formulario");
const misionArchivada = document.querySelector(".listaMisiones");
let Misiones = [];

const text = document.getElementById("mision");
text.style.cssText = `height: ${text.scrollHeight}px; overflow-y:hidden`;


eventListener();

function eventListener(){
    nuevaMision.addEventListener('submit', crearNuevaMision);
    text.addEventListener("input", ampliarArea);
}

function ampliarArea(){
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
}


function crearNuevaMision(e){
    e.preventDefault();
    
    const mision = document.querySelector('#mision').value;
    if( mision === ''){
        mostrarError("El mensaje no puede ir vacío");
        return;
    } else {
    console.log(mision);
    }
}

function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    
}