
document.addEventListener("DOMContentLoaded", function () {
  const subtitol = document.getElementById("subtitol");
  subtitol.textContent = "Pràctica JS – DOM";

  const llista = document.getElementById("llista-dom");
  const accionsLlista = document.querySelector("#ex-llista .accions");

  const botoAfegir = document.createElement("button");
  botoAfegir.textContent = "Afegeix element";

  botoAfegir.addEventListener("click", function () {
    const text = prompt("Introduce el texto del nuevo elemento:");

    if (text !== null && text.trim() !== "") {
      const nouElement = document.createElement("li");
      nouElement.textContent = text;
      llista.appendChild(nouElement);
    }
  });

  const botoBuidar = document.createElement("button");
  botoBuidar.textContent = "Buida llista";

  botoBuidar.addEventListener("click", function () {
    llista.innerHTML = "";
  });

  accionsLlista.appendChild(botoAfegir);
  accionsLlista.appendChild(botoBuidar);

  llista.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      console.log(event.target.textContent);
    }
  });

  const taula = document.querySelector("#taula-dades tbody");
  const accionsTaula = document.querySelector("#ex-taula .accions");

  const botoFila = document.createElement("button");
  botoFila.textContent = "Nova fila";

  botoFila.addEventListener("click", function () {
    const fila = document.createElement("tr");

    const columna1 = document.createElement("td");
    columna1.textContent = "Registre";

    const columna2 = document.createElement("td");
    columna2.textContent = Math.floor(Math.random() * 50) + 1;

    const columna3 = document.createElement("td");
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const any = data.getFullYear();
    columna3.textContent = dia + "/" + mes + "/" + any;

    fila.appendChild(columna1);
    fila.appendChild(columna2);
    fila.appendChild(columna3);

    taula.appendChild(fila);
  });

  accionsTaula.appendChild(botoFila);

  const accionsMode = document.querySelector("#ex-mode .accions");

  const botoModeNit = document.createElement("button");
  botoModeNit.textContent = "Mode nit";

  botoModeNit.addEventListener("click", function () {
    document.body.classList.toggle("nit");
  });

  accionsMode.appendChild(botoModeNit);

  const formulari = document.getElementById("form-registre");
  const nomUsuari = document.getElementById("nomUsuari");
  const emailUsuari = document.getElementById("emailUsuari");
  const pw1 = document.getElementById("pw1");
  const pw2 = document.getElementById("pw2");
  const codiPostal = document.getElementById("codiPostal");
  const idioma = document.getElementById("idioma");
  const botoRegistre = document.getElementById("btn-registre");
  const resultat = document.getElementById("resultat");

  botoRegistre.disabled = true;

  const camps = [nomUsuari, emailUsuari, pw1, pw2, codiPostal, idioma];

  camps.forEach(function (camp) {
    const error = document.createElement("span");
    error.className = "error";
    error.id = "error-" + camp.id;
    camp.insertAdjacentElement("afterend", error);

    camp.addEventListener("input", validarFormulari);
    camp.addEventListener("change", validarFormulari);
  });

  function mostrarError(camp, missatge) {
    const error = document.getElementById("error-" + camp.id);
    error.textContent = missatge;
  }

  function validarNom() {
    const valor = nomUsuari.value.trim();
    const regex = /^[A-Za-zÀ-ÿ0-9]+$/;

    if (valor === "") {
      mostrarError(nomUsuari, "El nom d'usuari és obligatori.");
      return false;
    }

    if (valor.length < 5) {
      mostrarError(nomUsuari, "El nom d'usuari ha de tenir mínim 5 caràcters.");
      return false;
    }

    if (!regex.test(valor)) {
      mostrarError(nomUsuari, "El nom només pot contenir lletres i números, sense espais.");
      return false;
    }

    mostrarError(nomUsuari, "");
    return true;
  }

  function validarEmail() {
    const valor = emailUsuari.value.trim();

    if (valor === "") {
      mostrarError(emailUsuari, "El correu electrònic és obligatori.");
      return false;
    }

    if (!valor.includes("@") || !valor.includes(".")) {
      mostrarError(emailUsuari, "El correu electrònic ha de contenir @ i .");
      return false;
    }

    mostrarError(emailUsuari, "");
    return true;
  }

  function validarPassword() {
    if (pw1.value === "") {
      mostrarError(pw1, "La contrasenya és obligatòria.");
      return false;
    }

    if (pw1.value.length < 8) {
      mostrarError(pw1, "La contrasenya ha de tenir mínim 8 caràcters.");
      return false;
    }

    mostrarError(pw1, "");
    return true;
  }

  function validarPasswordRepetida() {
    if (pw2.value !== pw1.value) {
      mostrarError(pw2, "Les contrasenyes han de coincidir.");
      return false;
    }

    if (pw2.value === "") {
      mostrarError(pw2, "Has de repetir la contrasenya.");
      return false;
    }

    mostrarError(pw2, "");
    return true;
  }

  function validarCodiPostal() {
    const regex = /^[0-9]{5}$/;

    if (codiPostal.value.trim() === "") {
      mostrarError(codiPostal, "El codi postal és obligatori.");
      return false;
    }

    if (!regex.test(codiPostal.value.trim())) {
      mostrarError(codiPostal, "El codi postal ha de tenir exactament 5 dígits.");
      return false;
    }

    mostrarError(codiPostal, "");
    return true;
  }

  function validarIdioma() {
    if (idioma.value === "") {
      mostrarError(idioma, "Has de seleccionar un idioma.");
      return false;
    }

    mostrarError(idioma, "");
    return true;
  }

  function validarFormulari() {
    const valid =
      validarNom() &&
      validarEmail() &&
      validarPassword() &&
      validarPasswordRepetida() &&
      validarCodiPostal() &&
      validarIdioma();

    botoRegistre.disabled = !valid;
    return valid;
  }

  formulari.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validarFormulari()) {
      resultat.textContent = "Hi ha errors al formulari. Revisa els camps.";
    } else {
      resultat.textContent = "Registre completat (demo).";
    }
  });
});
