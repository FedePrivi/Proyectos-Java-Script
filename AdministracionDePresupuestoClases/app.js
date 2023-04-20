//Variables y Selectores

const formulario = document.getElementById("gasto");
const listaGastosHTML = document.getElementById("listado-gastos");



//Eventos

eventListeners();
function eventListeners() {
   document.addEventListener("DOMContentLoaded", preguntarPresupuesto );
   formulario.addEventListener("submit", agregarGasto);

}

//Classes

class Presupuesto {
    constructor(presupuestoUsuario) {
        this.presupuesto = Number(presupuestoUsuario);
        this.restante = Number(presupuestoUsuario);
        this.gastos = [];
    }


    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante() {
        const totalGastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidadGasto, 0 );
        this.restante = this.presupuesto - totalGastado;
        // console.log(this.restante);
    }

    eliminarGasto( id ) {    
        this.gastos =  this.gastos.filter( gasto => gasto.id !== id);
        this.calcularRestante();
    }



}

class UI {

    insertarPresupuesto( cantidad ) {
        // console.log(cantidad);

        //Agregando al HTML
        document.getElementById("totalPresupuesto").textContent = cantidad.presupuesto;
        document.getElementById("restante").textContent = cantidad.restante;
    }

    mostrarAlerta(tipo, mensaje) {

        const containerAlerta = document.createElement("DIV");
        containerAlerta.classList.add("alert", "text-center");

        if (tipo === "error") {
  
            containerAlerta.classList.add("alert-danger");
        }else {
            containerAlerta.classList.add("alert-success");
        }

        containerAlerta.textContent = mensaje;
        formulario.insertBefore(containerAlerta, document.querySelector("form label"));

        setTimeout(() => {
            containerAlerta.remove();
        }, 3000);
    }

    mostrarGastosListaHTML( gastos ) {

        this.limpiarHTML();

        gastos.forEach( gasto => {
            const {nombreGasto, cantidadGasto, id} = gasto;
            
            const elementoLista = document.createElement("LI");

            elementoLista.classList.add("d-flex", "align-items-center", "justify-content-between",  "border-bottom", "border-dark-subtle", "p-3", "m-0");
            elementoLista.style.width = "100%";
            elementoLista.style.height = "50px";
            
            elementoLista.dataset.id = id; // || elementoLista.setAttribute('data-id', id);

            elementoLista.innerHTML = `

                <p class="mt-3"> ${nombreGasto} </p> 
                <p class="mt-3 p-1 border rounded-5 bg-primary"> ${cantidadGasto} </p> 

               
               
            `

            const buttonEliminarGastoListado = document.createElement("button");
            buttonEliminarGastoListado.classList.add("btn", "btn-danger");
            buttonEliminarGastoListado.innerHTML = 'Borrar &times';
            elementoLista.appendChild(buttonEliminarGastoListado);

            buttonEliminarGastoListado.onclick = () => {
                eliminarGasto( id ); // || presupuesto.eliminarGasto( id );
            }

            listaGastosHTML.appendChild(elementoLista);

        });
    }

    limpiarHTML() {
        while (listaGastosHTML.firstChild) {
            listaGastosHTML.removeChild(listaGastosHTML.firstChild);
        }
    }

    actualizarRestante( restante ) {
        document.getElementById("restante").textContent = restante;
        
    }

    comprobarPresupuesto(presupuestoOBJ) {
        const {presupuesto, restante} = presupuestoOBJ;

        const elementoRestanteDIV = document.getElementById("restanteContainer");

        //Comprobar si se gasto el 75%
        if ( restante < ( presupuesto / 4 ) ) {
            elementoRestanteDIV.classList.remove("alert-success", "alert-warning");
            elementoRestanteDIV.classList.add("alert-danger");
        } else if ( restante < ( presupuesto / 2 ) ){
             elementoRestanteDIV.classList.remove("alert-success", "alert-danger");         
             elementoRestanteDIV.classList.add("alert-warning");
        }else {
            elementoRestanteDIV.classList.remove("alert-danger", "alert-warning");
            elementoRestanteDIV.classList.add( "alert-success");
        }

        if (restante <= 0) {
            ui.mostrarAlerta("error", "Presupuesto agotado");
            formulario.querySelector(`button[type="submit"]`).disabled = true;
        }

    }

}

//Instanciar

const ui = new UI();
let presupuesto; //Porque si instancio el objeto de la clase prespuesto dentro de la funcion donde se valida el presupuesto del usuario esa variable del objeto solo va a poder ser utilizado en esa funcion (preguntarPresupuesto())



//Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt("¿Caul es tu presupuesto para esta semana?"); 


    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) window.location.reload();

    presupuesto = new Presupuesto(presupuestoUsuario);
    // console.log(presupuesto);
    
    ui.insertarPresupuesto(presupuesto);
}


//Añade gasto

function agregarGasto(e) {
    e.preventDefault();

    const nombreGasto = document.getElementById("nombreGasto").value;
    const cantidadGasto = Number(document.getElementById("cantidadGasto").value);
    // console.log(nombreGasto, cantidadGasto);

    if (nombreGasto === "" || cantidadGasto === "") {
        ui.mostrarAlerta("error", "Los campos deben estar completos");
        return  
    } else if (isNaN(cantidadGasto) || cantidadGasto <= 0) {
        ui.mostrarAlerta("error", "El campo de cantidad es inaceptado")
        return
    }

    ui.mostrarAlerta("","Gasto listado");

    const gasto = { nombreGasto, cantidadGasto, id: Date.now() };
    //Añade nuevo gasto
    presupuesto.nuevoGasto( gasto );


    //Imprimir los gastos
    const { gastos, restante } = presupuesto;
    
    ui.mostrarGastosListaHTML( gastos );

    ui.actualizarRestante(restante);

    ui.comprobarPresupuesto(presupuesto);

    formulario.reset();



}

function eliminarGasto( id ) {
    //Elimina los gastos del objeto
    presupuesto.eliminarGasto( id );
    //Elimina los gastos del HTML
    ui.mostrarGastosListaHTML(presupuesto.gastos);

    ui.actualizarRestante(presupuesto.restante);

    ui.comprobarPresupuesto(presupuesto);
}




