const textarea = document.querySelector("textarea");
const btnSubmit = document.querySelector(`.btn[type="submit"]`);
const formulario = document.querySelector("form");
const listaDeTweets = document.querySelector("ul");

let tweets = [];


(function leerLocalStorage() {
    // console.log("Funcion auto ejecutable");
    // console.log(localStorage.length);
    if (localStorage.length >= 1) {

        const arrayTweetsStorage = JSON.parse(localStorage.getItem("tweets"));
        
        //O nos podemos ahorrar el if...
        // const arrayTweetsStorage = JSON.parse(localStorage.getItem("tweets")) || [];
        // || []; porque si no tenemos la validacion del if del storage nos devuelve null y nos daria error al querer pintarTweets de null. Entonces si es null devolvemos un array vacio


        tweets = arrayTweetsStorage
        // console.log(tweets);
        pintarTweets()        
    }

})(); //O tambien lo podemos hacer en un addEventListener del DOMContentLoaded (cuando el documento este listo)

//tambien podriamos hacer algo como...
// formulario.addEventListener("submit" , (e) => {
//     e.preventDefault();
//     const tweet = formulario.querySelector("textarea").value
//     console.log(tweet);
//      .........
// })

btnSubmit.addEventListener("click", (e) => {

    e.preventDefault();
    
    if (!textarea.value) {
        return console.log("Se quiere enviar un tweet vacio");
    }

    const tweet = textarea.value;

    tweetObj = {
        id: Date.now(), //Emulando un id de la Base de Datos.
        tweet,
    }
    
    // tweets.push(textarea.value);
    tweets = [...tweets, tweetObj]

    localStorage.setItem( "tweets", JSON.stringify(tweets) )

    pintarTweets();

    formulario.reset();
})

function pintarTweets() {
    limpiarLista()
   

tweets.forEach( tweet => {

 

    const itemListaTweet = document.createElement("LI");
    const containerParrafoTweet = document.createElement("DIV");
    const parrafoTweet = document.createElement("DIV");
    const eliminarTweet = document.createElement("BUTTON");

    itemListaTweet.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start", "mb-3");
    containerParrafoTweet.classList.add("ms-2", "me-auto");
    parrafoTweet.classList.add("fw-bold");
    eliminarTweet.classList.add("btn","btn-sm", "bg-white", "rounded-pill", "text-danger");

    

    parrafoTweet.textContent = tweet.tweet;
    eliminarTweet.textContent = "X"

    // itemListaTweet.setAttribute("id", tweet.id)

    containerParrafoTweet.appendChild(parrafoTweet);
    itemListaTweet.appendChild(containerParrafoTweet);
    itemListaTweet.appendChild(eliminarTweet);


    // console.log(eliminarTweet);
    listaDeTweets.appendChild(itemListaTweet);



    //Si queremos hacerlo con la segunda opcion que es como lo hice yo antes de ver la solucion debemos pasarle el parametro evt. a las dos funciones, de eliminar() y la anonima o colocar un addEvnetLIStener y colocarle el id (linea 84)
    eliminarTweet.onclick = () => {
        eliminar(tweet.id)
    }
    


});


}

function limpiarLista() {
    while (listaDeTweets.firstChild) {
        listaDeTweets.removeChild(listaDeTweets.firstChild)
    }
}


function eliminar(id) {
    // console.log(id);
    // console.log(tweets);
    resultadoTweets = tweets.filter((tweet) => tweet.id !== id)
    tweets = resultadoTweets;

    pintarTweets()
    localStorage.setItem("tweets", JSON.stringify( tweets ))
    // console.log(tweets);

 
}

//O tambien podemos...

// function eliminar(e) {
//     const idTweetAEliminar = e.target.parentElement.id;
//     resultadoTweets = tweets.filter((tweet) => tweet.id !== parseInt( idTweetAEliminar ) )
//     tweets = resultadoTweets;

//     pintarTweets()
//     localStorage.setItem("tweets", JSON.stringify( tweets ))
//     console.log(tweets);
 

// }

 




