//Contenedor Resultados
const resultados = document.getElementById("resultado");

//Selectores
const marca = document.getElementById("marca");
const year = document.getElementById("year");
const minimo = document.getElementById("minimo");
const maximo = document.getElementById("maximo");
const puertas = document.getElementById("puertas");
const transmision = document.getElementById("transmision");
const color = document.getElementById("color");


const total = document.getElementById("total")



//Crear los años
const years = new Date().getFullYear()
const max = years;
const min = years - 13

for (let i = max; i >= min ; i-- ){
    
    const option = document.createElement("option")
    option.value = i;
    option.textContent = i;

    year.appendChild(option)

}




//Mostrar Resultados al cargar la pagina
document.addEventListener("DOMContentLoaded", () => {
    mostrarResultados(autos)
})



function mostrarResultados(resultado = autos) {


  

    limpiarResultadoHtml()

    total.textContent = ""

    const totalResultadosDeBusqueda = document.createElement("h6")
    totalResultadosDeBusqueda.innerHTML = `Total: ${autos.length}`
    total.appendChild(totalResultadosDeBusqueda)



    resultado.forEach( (auto) => {


        const {marca, modelo, year, precio, puertas, color, transmision} = auto; 



        const elementoHtmlAuto = document.createElement("p")
        elementoHtmlAuto.classList.add("m-2", "border-bottom", "border-warning-subtle")

        elementoHtmlAuto.innerHTML = `
            ${marca} ${modelo} - Año: ${year} - Precio: ${precio} - Puertas: ${puertas} - Color: ${color} - Transmision: ${transmision}
        `

        resultados.appendChild(elementoHtmlAuto)

    })
}

function limpiarResultadoHtml() {

   while (resultados.firstChild) {
    resultados.removeChild(resultados.firstChild)
   }



}

const datosBusqueda = {
    marca: "",
    year: "",
    minimo: "",
    maximo: "",
    transmision: "",
    puertas: "",
    transmision: "",
    color: "",
}

marca.addEventListener("change", (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAutos()
})

year.addEventListener("change", (e) => {
   datosBusqueda.year = parseInt( e.target.value );
   filtrarAutos()
})

minimo.addEventListener("change", (e) => {
    datosBusqueda.minimo = parseInt ( e.target.value )
    filtrarAutos()

})

maximo.addEventListener("change", (e) => {
    datosBusqueda.maximo = parseInt( e.target.value );
    filtrarAutos()
   
})

puertas.addEventListener("change", (e) => {
    datosBusqueda.puertas = parseInt( e.target.value );
    filtrarAutos() 
})

transmision.addEventListener("change", (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAutos();
})

color.addEventListener("change", (e) => {
   datosBusqueda.color = e.target.value;
   filtrarAutos()
})

//los eventListeners los podriamos ahorrar obteniendo el formulario y cuando cambie el formulario agregar los valores dinamicos a las propiedades dinamicas:
//formulario.addEventListener("change", (e) => {
// datosBusqueda[e.target.id] = e.target.value 
// filtrarAutos(e.target.id)
// })


function filtrarAutos() {
    const resultado = autos.filter( filtrarPorMarca ).filter( filtrarPorYear ).filter( filtrarPorPrecioMinimo ).filter( filtrarPorPrecioMaximo ).filter( filtrarPorPuertas ).filter( filtrarPorTransimicion ).filter( filtrarPorColor );

    if (resultado.length) {
        mostrarResultados(resultado)   
    }else {
        
        return alertNoHayResultados()
    }
}


function alertNoHayResultados() {
    limpiarResultadoHtml()

    const alerta = document.createElement("h1");
    alerta.textContent = "No hay Resultados, pruebe con otros filtros"
    alerta.classList.add("text-danger", "mb-5")

    resultados.appendChild(alerta)

}


function filtrarPorMarca(auto) {
if (datosBusqueda.marca) {
    return datosBusqueda.marca === auto.marca 
}
return auto
}

function filtrarPorYear(auto) {
    if (datosBusqueda.year) {
        return datosBusqueda.year === auto.year 
    }
    return auto
}

function filtrarPorPrecioMinimo(auto) {
    if (datosBusqueda.minimo) {
 
        return auto.precio >= datosBusqueda.minimo 
    }
    return auto
}

function filtrarPorPrecioMaximo(auto) {
    if (datosBusqueda.maximo) {
 
        return auto.precio <= datosBusqueda.maximo 
    }
    return auto
}

function filtrarPorPuertas(auto) {
    if(datosBusqueda.puertas){
    return auto.puertas === datosBusqueda.puertas
    }
    return auto
}

function filtrarPorTransimicion(auto) {
    if (!datosBusqueda.transmision == "") { //Para mostrar que esto es lo mismo que colocar como venimos haciendo (datosBusqueda.transmision)
        return auto.transmision === datosBusqueda.transmision
    }
    return auto
}

function filtrarPorColor(auto) {
    if(datosBusqueda.color){
      return  auto.color === datosBusqueda.color
    }

    return auto
}



