// This grabs orders data from app.js to admin.js
// const orders = window.orders;
// console.log(orders);

// //Storing edited program data
// // const savedPrograms = [];


// document.addEventListener("DOMContentLoaded", () => {
//   // Get elements
//   const divisionSelect = document.getElementById("division");
//   const divisionNames = document.getElementById("division-names");
//   const saveButton = document.getElementById("save-button");
//   const cancelButton = document.getElementById("cancel-button");
//   const exportButton = document.getElementById("export-button");

//   // Hide buttons and fields by default
//   saveButton.style.display = "none";
//   cancelButton.style.display = "none";
//   divisionNames.style.display = "none";

//   // When dropdown changes
//   divisionSelect.addEventListener("change", () => {
//     const selected = divisionSelect.value;


//     if (selected !== "none") {
//       divisionNames.style.display = "grid";
//       saveButton.style.display = "block";
//       cancelButton.style.display = "block";
//       prefillDivsionData(selected);
//       clearErrors();
//     } else {
//       // Hide if 'none'
//       divisionNames.style.display = "none";
//       saveButton.style.display = "none";
//       cancelButton.style.display = "none";
//     }
//   });

//   // Cancel button behavior
//   cancelButton.addEventListener("click", () => {
//     divisionNames.style.display = "none";
//     saveButton.style.display = "none";
//     cancelButton.style.display = "none";
//     divisionSelect.value = "none"; // reset dropdown
//   });
// });

// document.getElementById("adminForm").onsubmit = (e) => {
//   //Stops form sub
//   // e.preventDefault();
//   //clears errors after form sub
//   clearErrors();

//   const form = document.getElementById("adminForm");
//   const divisionSelect = document.getElementById("division");
//   const divisionNames = document.getElementById("division-names");
//   const dean = document.getElementById("dean");
//   const program = document.getElementById("program");

//   const payee = document.getElementById("payee");
//   const paid = document.getElementById("paid"); // select
//   const report = document.getElementById("report"); // select
//   const notes = document.getElementById("notes");

  
//   // Clear previous errors
//   //clearErrors();

//   let isValid = true;

//   if (!payee.value.trim()) {
//     document.getElementById("err-Payee").style.display = "block";
//     isValid = false;
//   }

//   if (paid.value.trim() === "none") {
//     document.getElementById("err-Paid").style.display = "block";
//     isValid = false;
//   }

//   if (report.value.trim() === "none") {
//     document.getElementById("err-Report").style.display = "block";
//     isValid = false;
//   }
//   if (!notes.value.trim()) {
//     document.getElementById("err-Notes").style.display = "block";
//     isValid = false;
//   }

//   if (!program.value.trim()) {
//     document.getElementById("err-Program").style.display = "block";
//     isValid = false;
//   }

//   //return isValid;
//   if (isValid) {
//     const confirmation = document.getElementById("save-confirmation");
//     const adminSection = document.getElementById("admin");
//     const timestamp = document.getElementById("save-timestamp");

//     //formatted timestamp
//     const now = new Date();
//     const formatted = now.toLocaleString();
//     timestamp.textContent = `(Last updated: ${formatted})`;

//     //Capturing the current timestamp
//     const updatedProgram = {
//       division: division.value,
//       program: program.value.trim(),
//       payee: payee.value.trim(),
//       paid: paid.value,
//       report: report.value,
//       notes: notes.value.trim(),
//       timestamp: new Date().toLocaleString()
//     }; 

//     //Saving to the in-memory array
//     // savedPrograms.push(updatedProgram);
    
//     console.log("Current saved programs:", updatedProgram);

//     confirmation.style.display = "block";

//     // Trigger the fade-in
//     setTimeout(() => {
//       confirmation.style.opacity = "1";
//     }, 10);

//     console.log("Changes saved successfully at:", formatted);

//     // hides your edit form
//     adminSection.style.display = "none";

//     // Fade out the message, then hide the form
//     setTimeout(() => {
//       confirmation.style.opacity = "0";
//       setTimeout(() => {
//         confirmation.style.display = "none"; 
//       }, 400);
//     }, 5000);
//   }
//   // this is to submit a form
//   return isValid;
// };

// function clearErrors() {
//   let errors = document.getElementsByClassName("error");
//   for (let i = 0; i < errors.length; i++) {
//     errors[i].style.display = "none";
//   }
// }

// // ADMIN FORM TOGGLE DISPLAY FUNCTION
// function toggleFormDisplay() {
//   const adminForm = document.getElementById("admin");
//   if (adminForm.style.display === "none" || adminForm.style.display === "") {
//     adminForm.style.display = "block";
//   } else {
//     adminForm.style.display = "none";
//   }
// }

// // PRE-FILLING ADMIN FORM WITH INFORMATION
// function prefillDivsionData(division) {
//   const data = orders[division];
//   if (!data) return;

//   document.getElementById("program").value = data.AcademicProgram || "";
//   document.getElementById("payee").value = data.Payees || "";
//   document.getElementById("paid").value = data.Paid || "none";
//   document.getElementById("report").value = data.Report || "none";
//   document.getElementById("notes").value = data.Notes || "";
// }

// Check latest information given to Division -> Academic Program


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