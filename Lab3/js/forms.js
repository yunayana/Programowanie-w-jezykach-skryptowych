function checkForm() {
  let isValid = true;

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  // Reset błędów
  document.getElementById("errorName").classList.add("d-none");
  document.getElementById("errorEmail").classList.add("d-none");
  document.getElementById("errorMessage").classList.add("d-none");

  // Imię
  if (name === "") {
    document.getElementById("errorName").classList.remove("d-none");
    isValid = false;
  }

  // Email
  if (email === "") {
    document.getElementById("errorEmail").innerHTML = "Podanie adresu email jest wymagane!";
    document.getElementById("errorEmail").classList.remove("d-none");
    isValid = false;
  } else {
    const regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
      document.getElementById("errorEmail").innerHTML = "Podano nieprawidłowy adres email!";
      document.getElementById("errorEmail").classList.remove("d-none");
      isValid = false;
    }
  }

  // Wiadomość
  if (message === "" || message.length > 250) {
    document.getElementById("errorMessage").classList.remove("d-none");
    isValid = false;
  }

  return isValid;
}
