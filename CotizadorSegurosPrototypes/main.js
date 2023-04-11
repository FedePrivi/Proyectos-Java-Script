function Seguro (marca, year, tipo) {
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Cotizacion con los datos

Seguro.prototype.cotizarSeguro = function () {
    /*
        1 = Americano incrementa el valor un 1.15%
        2 = Asiatico incrementa el valor un 1.05%
        3 = Europeo incrementa el valor un 1.35%
    */
    // console.log(this.marca);
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15; 
            break;

        case '2':
            cantidad = base * 1.05; 
            break;

        case '3':
            cantidad = base * 1.35; 
            break;    
        default:
            break;
    }

    // console.log(cantidad)

    //Leer el año
    // Por cada año de diferencia del año del auto al actual (suponiendo que el auto es del 2010 la diferencia seria 13) se le resta un 3% (se estaria restando al resultado 13 veces un 3%)

    const diferencia = new Date().getFullYear() - this.year; //(this.year seria la diferencia de nuestro auto)
    cantidad -= ((diferencia * 3 ) * cantidad) / 100; // que es la forma abreviada de  x = x - y es decir cantidad = cantidad - ....;

    // console.log(cantidad);


    //TIPO:
    /*
        Basico: * 30% 
        Completo: * 50%
    */ 

    if (this.tipo === "basico") {
        cantidad *= 1.30; // (x = x - y es decir cantidad = cantidad * ....;)
    }else {
        cantidad *= 1.50;
    }


    // console.log(cantidad);
    return cantidad;

}


function UI() {}

UI.prototype.llenarOpciones = () => {

    const selectYear = document.getElementById("year")
    const maxYear = new Date().getFullYear(),
          minYear = maxYear - 20;

    for(let i = maxYear; i > minYear; i-- ){

        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;

        selectYear.appendChild(option)


       

    }
}

//metodo de alerta
UI.prototype.mostrarAlerta = (mensaje, tipo) => {
    
    

    const div = document.createElement("div");
    
       

    if (tipo === 'error') {
        div.classList.add("bg-danger")
    }else {
        div.classList.add("bg-success")
    }

    div.classList.add("border", "p-2", "text-center", "w-50", "m-auto", "mt-3")
    div.textContent = mensaje;

   
    formulario.insertBefore(div, document.getElementById("resultado"));
    

    setTimeout(() => {
        div.remove()
    }, 3000);

}


//Mostrar resultados
UI.prototype.mostrarResultado = (seguro, total) => {
  
        const {marca, year, tipo} = seguro

        //Hacemos el Switch porque tenemos los values de las marcas con numero y estariamos mostrando en el resumen en la seccion marca un numero.

        let textoMarca;

        switch(marca) {
            case "1": 
                textoMarca = "Americano";
                break;
            case "2": 
            textoMarca = "Asiatico";
            break;

            case "3": 
                textoMarca = "Europeo";
                break;

            default:
                break;
        }


        const div = document.createElement("div");
        div.classList.add("border-1", "border", "border-primary")

        // console.log(seguro);

        div.innerHTML = `
        <p class="bg-info w-100 p-2 text-center fs-5"> Tu resumen </p>
        <p class="ms-2 fw-bold"> Marca: <span class="fst-normal">  ${textoMarca} </span> </p>
        <p class="ms-2 fw-bold"> Año: <span class="fst-normal">  ${year} </span> </p>
        <p class="ms-2 fw-bold"> Tipo de seguro: <span class="fst-normal">  ${tipo} </span> </p>
        <p class="ms-2 fw-bold"> Total a pagar:$ ${total} </p>
        `



        const containerResultado = document.querySelector("#resultado");
       
        

        const loading = document.querySelector(".spinner-grow");
        loading.classList.toggle("visually-hidden")

     

        //Insertar loader
        setTimeout(() => {
            containerResultado.appendChild(div);
            loading.classList.toggle("visually-hidden");

        }, 3000);
        



}



const ui = new UI();
// console.log(ui);

Object.getOwnPropertyNames(UI.prototype)


document.addEventListener("DOMContentLoaded", () => {

    ui.llenarOpciones()
})


eventListeners();
function eventListeners() {
    const formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", cotizandoSeguro)
}

function cotizandoSeguro(e) {
    e.preventDefault();

    //Leer valor de marca
    const marca = document.getElementById("marca").value

    //Leer valor de año
    const year = document.getElementById("year").value

    //Leer valor de tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value; // si le saco el value y le saco el checked a el input que lo tenga en el html me daria un error si no se selecciona ninguno porq estaria tratando el value de algo que no existe (del input que este cheked) se puede solucionar como esta hecho colocandole el checked al html o si no le colocamos el value lo colocamos en la validacion ( if(|| tipo.value === '') ) 

    
    if (marca === '' || year === '' || tipo === '') {
        ui.mostrarAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarAlerta('Cotizando...', 'success');

    //limpiar resumenes
    const resultados = document.querySelector("#resultado div");

    if (resultados != null) {
        resultados.remove()
    }



    //instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro()
    // console.log(total);
    // console.log(seguro); 

    ui.mostrarResultado(seguro, total)

}


