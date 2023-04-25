//Selectores
const formulario = document.getElementById("formulario");
//Seleccionando campos del formulario
const nombreMascotaInput = document.querySelector(`input[name="nombreMascota"]`);
const propietarioInput = document.querySelector(`input[name="propietario"]`);
const telefonoInput = document.querySelector(`input[name="telefono"]`);
const fechaInput = document.querySelector(`input[name="fecha"]`);
const horaInput = document.querySelector(`input[name="hora"]`);
const sintomasInput = document.querySelector(`textarea[name="sintomas"]`);

//Lista donde se van a mostrar las citas
const containerLista = document.getElementById("containerLista");

const columnaFormulario = document.getElementById("columnaFormulario");

let editando;

//Eventos
eventListener();
function eventListener() {
    formulario.addEventListener("submit", enviandoDatosFormulario );

    nombreMascotaInput.addEventListener("change", datosCita);
     propietarioInput.addEventListener("change", datosCita);
     telefonoInput.addEventListener("change", datosCita);
     fechaInput.addEventListener("change", datosCita);
     horaInput.addEventListener("change", datosCita);
     sintomasInput.addEventListener("change", datosCita);
}



//Objeto de los datos de la cita.

const citaOBJ = {
    nombreMascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}




//Clases
class Citas {
    constructor () {
        this.citas = [];
    }

    agregarCita(cita) {
        console.log(cita)
        this.citas = [...this.citas, cita];
        // console.log(this.citas);
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita  => cita.id !== id);
        // console.log(this.citas);
    }

    editarCita(citaActualizada) {
        this.citas = this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita )// || this.citas.map( cita => cita.id === citaActualizada.id ? cita = citaActualizada : cita )
        //Si el id de la cita es igual a la cita que estamos actulizando...sobreescribir esa cita por la cita actualizada (citaActualizada)
    }
}


class UI {

    mostrarAlerta(tipo, mensaje) {

        const divContainerAlerta = document.createElement("DIV");
        divContainerAlerta.classList.add("alert", "text-center");
        divContainerAlerta.textContent = mensaje;
        
        if (tipo === 'error') {
            divContainerAlerta.classList.add("alert-danger");            
        } else {
            divContainerAlerta.classList.add("alert-success");
        }


        columnaFormulario.insertBefore(divContainerAlerta, formulario);

        setTimeout(() => {
            divContainerAlerta.remove();    
        }, 3000);

    }

    imprimirCitas(){
        const {citas} = administrarCitas;

        this.limpiarListaHtml();

        if(administrarCitas.citas.length >= 1) {
            document.getElementById("tituloLista").textContent = "Lista citas"
        }else document.getElementById("tituloLista").textContent = "NO hay citas, comienza creando una"


        citas.forEach( cita => {
            
            const {nombreMascota, propietario,telefono, fecha, hora, sintomas, id} = cita;


            const containerCitaHtml = document.createElement("DIV");
            containerCitaHtml.classList.add("p-2", "m-1", "border", "border-1", "border-dark",);
            containerCitaHtml.style.maxWidth = "200px"

            containerCitaHtml.dataset.id = id;

            const mascotaParrafo = document.createElement("H2");
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = nombreMascota;

            const propietarioParrafo = document.createElement("P");
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement("P");
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bold">Telefono:</span> ${telefono}
            `;

            const fechaParrafo = document.createElement("P");
            fechaParrafo.innerHTML = `
                <span class="font-weight-bold">Fecha:</span> ${fecha}
            `;

            const horaParrafo = document.createElement("P");
            horaParrafo.innerHTML = `
                <span class="font-weight-bold">Hora:</span> ${hora}
            `;

            const sintomasParrafo = document.createElement("P");
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bold">Sintomas:</span> ${sintomas}
            `;

            const containerBotones = document.createElement("DIV");
            containerBotones.classList.add("d-flex", "justify-content-evenly", "mt-2", "mb-2", "bottom-0");

            const btnEliminar = document.createElement("BUTTON");
            btnEliminar.classList.add("btn", "btn-danger");
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path></svg>`;
            btnEliminar.onclick = () => eliminarCita(id);
            containerBotones.appendChild(btnEliminar);

            const btnEditar = document.createElement("BUTTON");
            btnEditar.classList.add("btn", "btn-info", "ms-2");
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path></svg> `;
            btnEditar.onclick = () => editarCita(cita);
            containerBotones.appendChild(btnEditar);




            // containerBotones.innerHTML = `
            //     <button class="btn btn-danger"> Elimianar </button>
            //     <button class="btn btn-info ms-2"> Editar </button>
            // `;

        

            containerCitaHtml.appendChild(mascotaParrafo);
            containerCitaHtml.appendChild(propietarioParrafo);
            containerCitaHtml.appendChild(telefonoParrafo);
            containerCitaHtml.appendChild(fechaParrafo);
            containerCitaHtml.appendChild(horaParrafo);
            containerCitaHtml.appendChild(sintomasParrafo);
            containerCitaHtml.appendChild(containerBotones);



            containerLista.appendChild(containerCitaHtml);
            console.log(containerCitaHtml);



        });

    }

    limpiarListaHtml () {
        while (containerLista.firstChild) {
            containerLista.removeChild(containerLista.firstChild)
        }
    }

}

//Inizilisacion
const ui = new UI();
let administrarCitas = new Citas();

//Funciones

function datosCita(e) {
    // console.log(e.target.value);
    citaOBJ[e.target.name] = e.target.value;
}


function enviandoDatosFormulario(e) {
    e.preventDefault()

    const {nombreMascota, propietario, telefono, fecha, hora, sintomas} = citaOBJ;

    if (!nombreMascota || !propietario || !telefono || !fecha || !hora || !sintomas) {
      return  ui.mostrarAlerta("error", "Todos los campos deben estar completos");
    }

    if (editando) {
    //    return console.log("Modo edicion");
    //Modo edicion:
    ui.mostrarAlerta("", "Editado correctamente")

    //Pasar el objeto de la cita de edicion
    administrarCitas.editarCita({...citaOBJ});


    formulario.querySelector('button[type="submit"]').textContent = "Crear Cita";

        //salir del modo edicion
    editando = false;

    }else {
        // console.log(" nueva cita");
        //Modo nueva cita:
        citaOBJ.id = Date.now();
        //Agregando cita
        administrarCitas.agregarCita( {...citaOBJ} ); //    administrarCitas.agregarCita( citaOBJ ); Si hacemos esto le estariamos pasando una referencia del objeto global de citaOBJ y rescribiria los demas objetos con el ultimo que se envia porque los demas objetos (los agregados anteriormente) tienen la misma referencia, por eso es que realiamos la copia del objeto y la enviamos.
        
        //Alerta de cita creada correctamente
        ui.mostrarAlerta("", "Cita creada correctamente")
        

    }

    //Imprimir citas
    ui.imprimirCitas();
    
    formulario.reset();
    reiniciarObjeto();
}

function reiniciarObjeto() {
    citaOBJ.nombreMascota =  '';
    citaOBJ.propietario =  '';
    citaOBJ.telefono = '';
    citaOBJ.fecha = '';
    citaOBJ.hora = '';
    citaOBJ.sintomas = '';
}

function eliminarCita(id) {
    administrarCitas.eliminarCita(id);
    ui.imprimirCitas();
    ui.mostrarAlerta("", "La cita se elimino correctamente");
}

function editarCita(cita) {
    const {nombreMascota, propietario,telefono, fecha, hora, sintomas, id} = cita;

    //Llenar los inputs
    nombreMascotaInput.value = nombreMascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //cambiar el texto del boton del formulario.
    formulario.querySelector('button[type="submit"]').textContent = "Guardar los cambios";

    //Colocando las propiedades del objeto global de la cita con los valores de la cita a editar
    citaOBJ.nombreMascota =  nombreMascota;
    citaOBJ.propietario =  propietario;
    citaOBJ.telefono = telefono;
    citaOBJ.fecha = fecha;
    citaOBJ.hora = hora;
    citaOBJ.sintomas = sintomas;
    citaOBJ.id = id;

    editando = true;

}


