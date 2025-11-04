const orders = window.orders;
console.log(orders);
//Storing edited program data
const savedPrograms = [];

//Mock data to fill the edit form with pre-existing data
// const mockPrograms = {
//   Technology: {
//     program: "Aviation",
//     payee: "Tad Henry",
//     paid: "Emails sent to Building Admins on 5/2/2025",
//     report: "No",
//     notes: "Yes! Tad is takeing this on"
//   },
//   HealthScience: {
//     program: "Physical Therapist Assistant",
//     payee: "Pam Kikillus",
//     paid: "Emails sent to Building Admins on 5/2/2025",
//     report: "Yes",
//     notes: "Yes! Pam and Anna will do this"
//   },
//   FineArt: {
//     program: "Music",
//     payee: "Ruth",
//     paid: "Emails sent to Building Admins on 5/2/2025",
//     report: "No",
//     notes: "Yes! Sam, Kelly, and Ruth all work on this together and divide the money three ways."
//   },
//   Humanities: {
//     program: "Communication Studies",
//     payee: "",
//     paid: "Emails sent to Building Admins on 5/2/2025",
//     report: "No",
//     notes: "No"
//   },
//   SocialScience: {
//     program: "Psychology",
//     payee: "Joy",
//     paid: "Emails sent to Building Admins on 5/2/2025",
//     report: "Submitted 6/15",
//     notes: "Yes! Joy and Jerry will do the project together"
//   },
//   English: {
//     program: "English",
//     payee: "Aley Martin",
//     paid: "Emails sent to Building Admins on 5/2/2025",
//     report: "Report to be completed year 2",
//     notes: "Yes! See notes on adjuncts to pay. Will submit report next year 2025-2026"
//   },
//   Science: {
//     program: "Biology/Environmental Science",
//     payee: "Danny Najera",
//     paid: "Emails sent to Building Admins on 5/2/2025",
//     report: "Report coming this summer",
//     notes: "Yes, they are doing a 2-year project with majors level Bio classes"
//   },
//   Trades: {
//     program: "Autmotive Technology",
//     payee: "",
//     paid: "Emails sent to Building Admins on 5/2/2025",
//     report: "Np",
//     notes: "Initial Invite Sent from Juli  9/26/24. Follow up on 10/21"
//   },
// };



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
    form.submit()
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
  const data = orders[division];
  if (!data) return;

  document.getElementById("program").value = data.AcademicProgram || "";
  document.getElementById("payee").value = data.Payees || "";
  document.getElementById("paid").value = data.Paid || "none";
  document.getElementById("report").value = data.Report || "none";
  document.getElementById("notes").value = data.Notes || "";
}

// Check latest information given to Division -> Academic Program
