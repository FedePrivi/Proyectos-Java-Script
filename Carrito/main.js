//container-carrito

const containerCarrito = document.querySelector(".container-carrito");
const btnAbrirCerrar = document.querySelector(".fa-sharp");
const filaProductoEnCarrito = document.querySelector("tbody");
const vaciarCarritoBTN = document.querySelector(".vaciar-carrito-btn")
const containerNav = document.querySelector(".container-fluid")

const btnRestarCantidad = document.querySelector(".btn-restar-cantidad")

const containerPrecioTotal = document.getElementById("container-total")
console.log(containerPrecioTotal);

let carrito = [];

cargarAddEventListener()

function cargarAddEventListener() {
//Para dejar fijo el carrito al clickearlo
    btnAbrirCerrar.addEventListener("click" , () => {
        containerCarrito.classList.toggle("open")
    
    })

// Obtener datos del card que se hizo click  
    document.addEventListener("click", obtenerCardAuto) 

//Vaciar carrito
    vaciarCarritoBTN.addEventListener("click", vaciarCarro)

//  Disminuir cantidad de cada objeto en el carrito
    containerCarrito.addEventListener("click", restarCantidad)
    
    
}


(function obtenerDatosStorage() {
    carrito = JSON.parse(localStorage.getItem( "Carrito" )) || [];
    mostrarCarrito()
}) ();



function obtenerCardAuto (e) {

    if (e.target.classList.contains("agregar")) {
    const card = e.target.parentElement.parentElement.parentElement;
       
     const imagen = card.children[0].children[0].src; 
     const [nombre, , precio] = card.children[1].children
   
    
    //Si ya existe sumar uno en cantidad y no agregar un elemento igual al carrito
    
  

    agregarAlCarrito(imagen, nombre, precio, card)

    }
}



function agregarAlCarrito(imagen, nombre, precio, card) {
//paso al card para mostrar el ejemplo al extraer el id de otra forma de como lo hice como las props children
// console.log(card.querySelector('button').getAttribute('data-id'));
//si el objeto (auto) no existe en el carrito tengo que crearlo:


    const auto = {
        imagen: imagen,
        nombre: nombre.textContent,  
        precio: precio.textContent,
        cantidad: 1,
        id: card.querySelector('button').getAttribute('data-id'),
    }

    const existe = carrito.some(CadaAuto => CadaAuto.id === auto.id)

    if (existe) {
        const nuevoCarrito = carrito.map( CadaAuto => {
            if (CadaAuto.id === auto.id) {
                CadaAuto.cantidad++
                return CadaAuto; //retorna el objeto actualizado (lo coloca en el nuevo carrito)
            } else {
                return CadaAuto; //retorna los objetos que no se deben actualizar 
            }
        })    
        carrito = [...nuevoCarrito]
        console.log(carrito);

       

    }else{
   
    carrito.push(auto)   // carrito.push(auto) // o tambien:  carrito = [...carrito, auto] pero deberiamos cambiar el const por let al declarar el array carrito. Porque estariamos tratando de modificar una constante 
    
     //Agregando al Storage
     localStorage.setItem("Carrito", JSON.stringify( carrito ) )

}
     mostrarCarrito()
}



function mostrarCarrito () {
    
    limpiarCarritoHTML()


    
    carrito.forEach((auto) => {

     
      
        const {id} = auto

        const containerAuto = document.createElement("tr")
        const containerImagenAuto = document.createElement("td")
        const imagenAuto = document.createElement("img") 
        const nombreAuto =  document.createElement("td")
        const precioAuto = document.createElement("td")
        const cantidad = document.createElement("td")
        const containerBtnRestarCantidad = document.createElement("td")
        const btnRestarCantidad = document.createElement("a")

        containerAuto.classList.add("container-producto-carrito")
        containerImagenAuto.classList.add("container-img-carrito")
        imagenAuto.classList.add("imagen-producto-carrito")
        btnRestarCantidad.classList.add("btn-restar-cantidad")

        imagenAuto.src = auto.imagen
        nombreAuto.textContent = auto.nombre
        precioAuto.textContent = auto.precio
        cantidad.textContent = auto.cantidad
        btnRestarCantidad.textContent = "X"

        //Para detectar el objeto que se esta queriendo disminuir la cantidad lo vamos a usar en la funcion restarCantidad:
        btnRestarCantidad.setAttribute("data-id", id)
    

        containerImagenAuto.appendChild(imagenAuto)
        containerBtnRestarCantidad.appendChild(btnRestarCantidad)
        containerAuto.appendChild(containerImagenAuto)
        containerAuto.appendChild(nombreAuto)
        containerAuto.appendChild(precioAuto)
        containerAuto.appendChild(cantidad)
        containerAuto.appendChild(containerBtnRestarCantidad)

        filaProductoEnCarrito.appendChild(containerAuto)
        
    
})


if (carrito.length >= 1) {
    containerPrecioTotal.innerHTML = "";
    const precioTotal =  calcularTotal();

    containerPrecioTotal.innerHTML = `
    <h2 style="color: white; margin-right: 15px;">Total a pagar:</h2>
    <h3 style="color: white; margin-top: auto">${precioTotal} </h3>
    `
    }else {
        containerPrecioTotal.innerHTML = "";
    }



}




function limpiarCarritoHTML() {
    // filaProductoEnCarrito.textContent = ""; o tambien podemos...

    while (filaProductoEnCarrito.firstChild) { //mientras el contenedor que recibe los elementos tenga un hijo...
        filaProductoEnCarrito.removeChild(filaProductoEnCarrito.firstChild) //va eliminarlos uno por uno
    }
    
    //es para no volver a pintar los autos el doble de veces por leer el array. (hace lo mismo que filaProductoEnCarrito.textContent = "" o .innerHTML = "")
}


function vaciarCarro() {
    carrito = [];
    mostrarCarrito()
    containerPrecioTotal.innerHTML = "";

}




function restarCantidad(e) {
    if (e.target.classList.contains("btn-restar-cantidad")) {
        const BTN_ID = e.target.dataset["id"]
        const productoHTML = e.target.parentElement.parentElement

//corregir esto porque pienso que es mala practica obtener la cantidad del producto de el html y no del array carrito.//Fijarese con find() buscar el objeto que coincida con el array y apartir de ese objeto hacer las validaciones

        if (productoHTML.children[3].textContent == 1) {
                const nuevoCarrito =  carrito.filter(auto => auto.id !==  BTN_ID)
                carrito = [...nuevoCarrito]
                // filaProductoEnCarrito.removeChild(productoHTML) 
                mostrarCarrito()
                //son dos alternativas esta y mostrarCarrito() para eliminar el elemento pero no hacen falta porq alfinal del if global se ejecuta mostrarCarrito con el nuevo carro, aunque llamo a la funcion para que actualize el total del precio del carrito porque al ejecutar esta funcion va a entrar al if de calcularPrecioTotal y si no existen elementos en el carrito borra el total.
            } else {
            const nuevoCarrito = carrito.map(auto => {
                if (auto.id === BTN_ID) {
                    //actualizar storage
                    //
                    auto.cantidad--
                    return auto
                }else {
                    return auto
                }
                
            })
            carrito = [...nuevoCarrito]
        }
        localStorage.setItem( "Carrito", JSON.stringify( carrito ))
        mostrarCarrito()
        }
            
    }





    
function calcularTotal() {
   return carrito.reduce((precioTotal, auto) => precioTotal + parseInt(auto.precio) * auto.cantidad, 0)
    }


        