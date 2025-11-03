document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const divisionSelect = document.getElementById("division");
  const divisionNames = document.getElementById("division-names");
  const saveButton = document.getElementById("save-button");
  const cancelButton = document.getElementById("cancel-button");
  const exportButton = document.getElementById("export-button");

  // Hide buttons and fields by default
  saveButton.style.display = "none";
  cancelButton.style.display = "none";
  divisionNames.style.display = "none";

  // When dropdown changes
  divisionSelect.addEventListener("change", () => {
    const selected = divisionSelect.value;

    if (selected !== "none") {
      divisionNames.style.display = "grid";
      saveButton.style.display = "block";
      cancelButton.style.display = "block";
    } else {
      // Hide if 'none'
      divisionNames.style.display = "none";
      saveButton.style.display = "none";
      cancelButton.style.display = "none";
    }
  });

  // Cancel button behavior
  cancelButton.addEventListener("click", () => {
    divisionNames.style.display = "none";
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
    divisionSelect.value = "none"; // reset dropdown
  });
});

document.getElementById("adminForm").onsubmit = (e) => {
  //Stops form sub
  e.preventDefault();
  //clears errors after form sub
  clearErrors();

  const form = document.getElementById("adminForm");
  const divisionSelect = document.getElementById("division");
  const divisionNames = document.getElementById("division-names");
  const dean = document.getElementById("dean");
  const program = document.getElementById("program");

  const payee = document.getElementById("payee");
  const paid = document.getElementById("paid"); // select
  const report = document.getElementById("report"); // select
  const notes = document.getElementById("notes");

  
  // Clear previous errors
  //clearErrors();

  let isValid = true;

  if (!payee.value.trim()) {
    document.getElementById("err-Payee").style.display = "block";
    isValid = false;
  }

  if (paid.value.trim() === "none") {
    document.getElementById("err-Paid").style.display = "block";
    isValid = false;
  }

  if (report.value.trim() === "none") {
    document.getElementById("err-Report").style.display = "block";
    isValid = false;
  }
  if (!notes.value.trim()) {
    document.getElementById("err-Notes").style.display = "block";
    isValid = false;
  }

  if (!program.value.trim()) {
    document.getElementById("err-Program").style.display = "block";
    isValid = false;
  }

  //return isValid;
  if (isValid) {
    const confirmation = document.getElementById("save-confirmation");
    const adminSection = document.getElementById("admin");
    const timestamp = document.getElementById("save-timestamp");

    //formatted timestamp
    const now = new Date();
    const formatted = now.toLocaleString();
    timestamp.textContent = `(Last updated: ${formatted})`;

    confirmation.style.display = "block";

    // Trigger the fade-in
    setTimeout(() => {
      confirmation.style.opacity = "1";
    }, 10);

    console.log("Changes saved successfully at:", formatted);

    // hides your edit form
    adminSection.style.display = "none";

    // Fade out the message, then hide the form
    setTimeout(() => {
      confirmation.style.opacity = "0";
      setTimeout(() => {
        confirmation.style.display = "none"; 
      }, 400);
    }, 5000);
  }
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

// PRE-FILLING ADMIN FORM WITH INFORMATION

// Check latest information given to Division -> Academic Program
