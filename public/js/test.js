// This grabs orders data from app.js to admin.js
// const orders = window.orders;
// console.log(orders);

// const selectedDivision = window.selectedDivision;
// console.log(selectedDivision);

document.getElementById("adminForm").onsubmit = (e) => {
  clearErrors();
  console.log('hi');
  return isValid;
};

function clearErrors() {
  let errors = document.getElementsByClassName("error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}

// ADMIN FORM TOGGLE DISPLAY FUNCTION
function toggleFormDisplay() {
  const adminForm = document.getElementById("admin");
  if (adminForm.style.display === "none" || adminForm.style.display === "") {
    adminForm.style.display = "block";
  } else {
    adminForm.style.display = "none";
  }
}
