function salutPersonalizat() {
  const acum = new Date();
  const ora = acum.getHours();

  const paragraf = document.querySelector("header .subtitle");

  if (!paragraf) {
    return;
  }

  if (ora >= 6 && ora <= 11) {
    paragraf.textContent = "Bună dimineața! Bine ai venit pe pagina mea.";
  } else if (ora >= 12 && ora <= 17) {
    paragraf.textContent = "Bună ziua! Bine ai venit pe pagina mea.";
  } else {
    paragraf.textContent = "Bună seara! Bine ai venit pe pagina mea.";
  }
}

function submitForm() {
  const nume = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mesaj = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  console.log("Nume:", nume);
  console.log("Email:", email);
  console.log("Mesaj:", mesaj);

  if (!nume || !email || !mesaj) {
    if (status) {
      status.className = "form-status err";
      status.textContent = "Completează toate câmpurile.";
    }
    console.warn("Goodbye World!");
    return;
  }

  if (status) {
    status.className = "form-status ok";
    status.textContent = "Mesaj trimis. Verifică consola F12.";
  }

  console.warn("Goodbye World!");
}

salutPersonalizat();