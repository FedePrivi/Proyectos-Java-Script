document.addEventListener("DOMContentLoaded", function () {
  const email = {
    email: "",
    asunto: "",
    mensaje: "",
  };

  const formulario = document.querySelector(".formulario");

  const inputEmail = document.querySelector(`input[name="email"]`);
  const inputEmailCC = document.querySelector(`input[name ="emailCc"]`)

  const inputAsunto = document.querySelector(`input[name="asunto"]`);
  const inputMensaje = document.querySelector(`textarea[name="mensaje"]`);

  const btnSubmit = document.querySelector(`button[type="submit"]`);
  const btnResetForm = document.querySelector(`.btn-danger`);
  const spinnerLoading = document.getElementById("spinner");

  btnSubmit.addEventListener("click", enviarEamail);

  btnResetForm.addEventListener("click", function (e) {
    e.preventDefault();
    resetearFormulario();
  });

  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);

  //campo no obligatorio
  //extra: este campo de CC es como el que tienen al redactar en gmail y no es obligatorio entonces no lo podemos pasar por la funcion validar como los demas, pero si llega a tener contenido hay q validar si es un email valido.

  inputEmailCC.addEventListener("input", (e) => {
    limpiarAlerta(e.target.parentElement)

    if (e.target.value.trim() !== "") {
        validar(e)
    }    

  }) 
  comprobarEmail();

  function enviarEamail(e) {
    e.preventDefault();

    spinnerLoading.classList.add("spinner-border");

    setTimeout(() => {
      resetearFormulario();

      spinnerLoading.classList.remove("spinner-border");

      const alertaExito = document.createElement("p");
      alertaExito.textContent = "Se envio el email con exito";
      alertaExito.style.color = "green";

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();

      }, 3000);
    }, 3000);
  }

  function validar(e) {

    if (e.target.value.trim() === "") {
      mostrarAlertaError(
        `El campo del ${e.target.name} es obligatorio`,
        e.target.parentElement
      );
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }


    if (e.target.type === "email" && !validarEmail(e.target.value)) {
      mostrarAlertaError(`El email no es valido`, e.target.parentElement);
      email[e.target.name] = "";
      comprobarEmail();
      return;
    }

    limpiarAlerta(e.target.parentElement);

    email[e.target.name] = e.target.value.trim().toLowerCase(); //y si es el emailCc crea una nueva propiedad al objeto con el valor por eso es que tambien el campo de emailCc si se escribe desabilita y habilita el booton de enviar porque crea esa propiedad a escribir en el input de emailCc.
    comprobarEmail();
  }

  function validarEmail(email) {
    const regExp = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const result = regExp.test(email);
    return result;
  }

  function mostrarAlertaError(mensajeError, referencia) {
    limpiarAlerta(referencia);

    const alerta = document.createElement("p");
    alerta.style.color = "red";
    alerta.textContent = mensajeError;

    referencia.appendChild(alerta);
  }

  function limpiarAlerta(referencia = document) {
    //document por si se presiona el boton de reset con alertas y como no le paso ningun argumento de resetearFormulario() que se document asi elimina todos los "p".

    const alerta = referencia.querySelector("p");

    if (alerta) {
      alerta.remove();
    }
  }

  function comprobarEmail() { 
    if (Object.values(email).includes("")) {
      btnSubmit.disabled = true;
      return;
    }

    btnSubmit.disabled = false;
    //no le agrego estilo de opacity porque al colocarle el disabled en true bootstrap ya le coloca el estilo de opacity.
  }

  function resetearFormulario() {
    email.email = "";
    email.asunto = "";
    email.mensaje = "";
    email.emailCc = "";

    formulario.reset();
    comprobarEmail();
    limpiarAlerta();
  }
});
