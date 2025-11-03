//Storing edited program data
const savedPrograms = [];

//Mock data to fill the edit form with pre-existing data
const mockPrograms = {
  Technology: {
    program: "Software Development",
    payee: "Tyrell Chappel",
    paid: "Yes",
    report: "No",
    notes: "Preparing next quarter's project updates"
  },
  HealthScience: {
    program: "Nursing",
    payee: "Jhoanna Opilac",
    paid: "No",
    report: "Yes",
    notes: "Report submitted for spring term"
  },
  FineArt: {
    program: "Visual Arts",
    payee: "Jermaine Felicitas",
    paid: "Yes",
    report: "Yes",
    notes: "Preparing gallery showcase"
  },
  Humanities: {
    program: "Philosophy",
    payee: "Howell Diga",
    paid: "Yes",
    report: "No",
    notes: "Completed department review for Fall"
  },
  SocialScience: {
    program: "Psychology",
    payee: "Amphi Halili",
    paid: "No",
    report: "Yes",
    notes: "Pending research approval update"
  },
  English: {
    program: "Creative Writing",
    payee: "Glenda Diga",
    paid: "No",
    report: "No",
    notes: "Revising course outcomes for next term"
  },
  Science: {
    program: "Biology",
    payee: "Tony Lewis",
    paid: "No",
    report: "Yes",
    notes: "Research grant proposal submitted"
  },
  Trades: {
    program: "Autmotive",
    payee: "Xavier Lewis",
    paid: "No",
    report: "Yes",
    notes: "New equipment installed in shop"
  },
};



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
      prefillDivsionData(selected);
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

    //Capturing the current timestamp
    const updatedProgram = {
      division: division.value,
      program: program.value.trim(),
      payee: payee.value.trim(),
      paid: paid.value,
      report: report.value,
      notes: notes.value.trim(),
      timestamp: new Date().toLocaleString()
    }; 

    //Saving to the in-memory array
    savedPrograms.push(updatedProgram);

    console.log("Current saved programs:", savedPrograms);

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
  }};

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
function prefillDivsionData(division) {
  const data = mockPrograms[division];
  if (!data) return;

  document.getElementById("program").value = data.program || "";
  document.getElementById("payee").value = data.payee || "";
  document.getElementById("paid").value = data.paid || "none";
  document.getElementById("report").value = data.report || "none";
  document.getElementById("notes").value = data.notes || "";
}

// Check latest information given to Division -> Academic Program
