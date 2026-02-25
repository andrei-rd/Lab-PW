function submitForm() {
  const nume = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mesaj = document.getElementById("message").value.trim();
  const status = document.getElementById("formStatus");

  console.log("Nume:", nume);
  console.log("Email:", email);
  console.log("Mesaj:", mesaj);

  if (!nume || !email || !mesaj) {
    status.className = "form-status err";
    status.textContent = "Completează toate câmpurile.";
    console.warn("Goodbye World!");
    return;
  }

  status.className = "form-status ok";
  status.textContent = "Mesaj trimis. Verifică consola F12.";

  console.warn("Goodbye World!");
}
