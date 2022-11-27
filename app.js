const nuevaMision = document.querySelector("#formulario");
const misionArchivada = document.querySelector("#listaMisiones");
let misiones = [];

const text = document.getElementById("mision");
text.style.cssText = `height: ${text.scrollHeight}px; overflow-y:hidden`;


eventListener();

function eventListener(){
    nuevaMision.addEventListener('submit', crearNuevaMision);
    text.addEventListener("input", ampliarArea);

    document.addEventListener("DOMContentLoaded", () => {
        misiones = JSON.parse( localStorage.getItem("misiones")) || [];
        console.log(misiones);

        crearHTML();
    });
}

function ampliarArea(){
    this.style.height = "auto";
    this.style.height = `${this.scrollHeight}px`;
}


function crearNuevaMision(e){
    e.preventDefault();
    
    const mision = document.querySelector('#mision').value;

    const misionObj = {
        id: Date.now(),
        texto: mision
    }

    if( mision === ''){
        mostrarError("El mensaje no puede ir vacío");
        return;
    }  
    misiones = [...misiones, misionObj];
    console.log(misiones);
     crearHTML();
    }


    function crearHTML(){

        limpiarHTML();

        if(misiones.length > 0){
            misiones.forEach( mision => {
                const botonEliminar = document.createElement('a');
                botonEliminar.classList.add('botonEliminar');
                botonEliminar.innerHTML = "Descartar";

                botonEliminar.onclick = () => {
                    borrarMision(mision.id);
                }

                const li = document.createElement('li');

                li.innerText = mision.texto;
                li.classList.add("li");

                li.appendChild(botonEliminar);
                misionArchivada.appendChild(li);
        
            });
        }

        sincronizarDatos(); //Una vez que se crea el HTML, siempre estamos sincronizando nuestro Storage
    }


function mostrarError(error){
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add("error");
    const inputFondo = document.querySelector("#inputFondo");
    inputFondo.appendChild(mensajeError);    
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function sincronizarDatos(){
    localStorage.setItem('misiones', JSON.stringify(misiones));
}

function borrarMision(id) {
    misiones = misiones.filter ( mision => mision.id !== id);

   crearHTML();
}


function limpiarHTML(){
    while( listaMisiones.firstChild) {
        listaMisiones.removeChild(listaMisiones.firstChild);
    }
}


