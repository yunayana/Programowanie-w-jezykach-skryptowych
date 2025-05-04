function checkForm() {
  let isValid = true;

  const name = document.getElementById("contactName").value.trim();
  const email = document.getElementById("contactEmail").value.trim();
  const message = document.getElementById("contactMessage").value.trim();

  document.getElementById("errorName").classList.add("d-none");
  document.getElementById("errorEmail").classList.add("d-none");
  document.getElementById("errorMessage").classList.add("d-none");

  document.getElementById("contactName").classList.remove("is-invalid", "is-valid");
  document.getElementById("contactEmail").classList.remove("is-invalid", "is-valid");
  document.getElementById("contactMessage").classList.remove("is-invalid", "is-valid");

  if (name === "") {
    document.getElementById("errorName").classList.remove("d-none");
    document.getElementById("contactName").classList.add("is-invalid");
    isValid = false;
  } else {
    document.getElementById("contactName").classList.add("is-valid");
  }


  if (email === "") {
    document.getElementById("errorEmail").innerHTML = "Podanie adresu email jest wymagane!";
    document.getElementById("errorEmail").classList.remove("d-none");
    document.getElementById("contactEmail").classList.add("is-invalid");
    isValid = false;
  } else {
    const regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
      document.getElementById("errorEmail").innerHTML = "Podano nieprawidłowy adres email!";
      document.getElementById("errorEmail").classList.remove("d-none");
      document.getElementById("contactEmail").classList.add("is-invalid");
      isValid = false;
    } else {
      document.getElementById("contactEmail").classList.add("is-valid");
    }
  }

  if (message === "" || message.length > 250) {
    document.getElementById("errorMessage").classList.remove("d-none");
    document.getElementById("contactMessage").classList.add("is-invalid");
    isValid = false;
  } else {
    document.getElementById("contactMessage").classList.add("is-valid");
  }

  return isValid;
}
