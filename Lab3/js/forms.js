
function validateName() {
  const name = document.getElementById("contactName").value.trim();
  const nameGroup = document.getElementById("nameGroup");
  const errorName = document.getElementById("errorName");

  if (name === "") {
    errorName.classList.remove("d-none");
    nameGroup.classList.add("is-invalid");
    nameGroup.classList.remove("is-valid");
  } else {
    errorName.classList.add("d-none");
    nameGroup.classList.remove("is-invalid");
    nameGroup.classList.add("is-valid");
  }
}


function validateEmail() {
  const email = document.getElementById("contactEmail").value.trim();
  const emailGroup = document.getElementById("emailGroup");
  const errorEmail = document.getElementById("errorEmail");
  
  if (email === "") {
    errorEmail.innerHTML = "Podanie adresu email jest wymagane!";
    errorEmail.classList.remove("d-none");
    emailGroup.classList.add("is-invalid");
    emailGroup.classList.remove("is-valid");
  } else {
    const regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
      errorEmail.innerHTML = "Podano nieprawidłowy adres email!";
      errorEmail.classList.remove("d-none");
      emailGroup.classList.add("is-invalid");
      emailGroup.classList.remove("is-valid");
    } else {
      errorEmail.classList.add("d-none");
      emailGroup.classList.remove("is-invalid");
      emailGroup.classList.add("is-valid");
    }
  }
}

function validateMessage() {
  const message = document.getElementById("contactMessage").value.trim();
  const messageGroup = document.getElementById("messageGroup");
  const errorMessage = document.getElementById("errorMessage");
  
  if (message === "" || message.length > 250) {
    errorMessage.classList.remove("d-none");
    messageGroup.classList.add("is-invalid");
    messageGroup.classList.remove("is-valid");
  } else {
    errorMessage.classList.add("d-none");
    messageGroup.classList.remove("is-invalid");
    messageGroup.classList.add("is-valid");
  }
}
