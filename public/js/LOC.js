// document.addEventListener("DOMContentLoaded", () => {
//   // Get elements
//   const divisionSelect = document.getElementById("division");
//   const divisionNames = document.getElementById("division-names");
//   const dean = document.getElementById("dean");
//   const pen = document.getElementById("PEN");
//   const loc = document.getElementById("Rep");
//   const chair = document.getElementById("Chair");
//   const saveButton = document.getElementById("save-button");
//   const cancelButton = document.getElementById("cancel-button");
//   const exportButton = document.getElementById("export-button");

//   // Division data
//   // Dean, pen,loc, chair
// const Divisions = {
//   FineArt: [
//     "Christie Gilliland",
//     "Liz Peterson",
//     "Monica Bowen",
//     "Paul Metevier",
//   ],
//   Technology: [
//     "Miebeth Castillo-Booth",
//     "Angie Brenner",
//     "Josh Archer",
//     "Michael Wood",
//   ],
//   Humanities: ["Jamie Fitzgerald", "Liz Peterson", "Lisa Luengo", "Katie Cunnion"],
//   SocialScience: ["Christie Gilliland", "Liz Peterson", "Joy Crawford ", "Mark Thomason"],
//   English: ["Jamie Fitzgerald", "Liz Peterson", "Jake Frye", "Ian Sherman"],
//   Science: ["Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert"],
//   HealthScience: ["Lionel Candido Flores", "Thom Jackson", "", "Leslie Kessler "],
//   Trades: ["Lea Ann Simpson", "Mary Singer", "Ben Orr", "David Lewis"],
// };

//   // Hide buttons and fields by default
//   saveButton.style.display = "none";
//   cancelButton.style.display = "none";
//   divisionNames.style.display = "none";

//   // When dropdown changes
//   divisionSelect.addEventListener("change", () => {
//     const selected = divisionSelect.value;

//     if (selected !== "none") {
//       divisionNames.style.display = "block";
//       saveButton.style.display = "block";
//       cancelButton.style.display = "block";

//       if (Divisions[selected]) {
//         clearErrors();
//         // Fill fields with division info
//         dean.value = Divisions[selected][0];
//         pen.value = Divisions[selected][1];
//         loc.value = Divisions[selected][2];
//         chair.value = Divisions[selected][3];
//       }
//     } else {
//       // Hide if 'none'
//       divisionNames.style.display = "none";
//       saveButton.style.display = "none";
//       cancelButton.style.display = "none";
//     }
//   });
//   //save feature
//   saveButton.addEventListener("click", (e) => {
//     // e.preventDefault();

//     const selectedDivision = divisionSelect.value;

//     if (selectedDivision !== "none") {
//       // Get the current values from the form fields
//       const deanValue = dean.value;
//       const penValue = pen.value;
//       const locValue = loc.value;
//       const chairValue = chair.value;

//       // update the values in the
//       Divisions[selectedDivision] = [deanValue, penValue, locValue, chairValue];
//       console.log(Divisions);
//     }
//     // }
//   });

//   // Cancel button behavior
//   cancelButton.addEventListener("click", () => {
//     divisionNames.style.display = "none";
//     saveButton.style.display = "none";
//     cancelButton.style.display = "none";
//     divisionSelect.value = "none"; // reset dropdown
//   });

// });

// document.getElementById('Loc-story').onsubmit = () => {
//   const form = document.getElementById("LOC-story");
//   const divisionSelect = document.getElementById("division-selector");
//   const divisionNames = document.getElementById("division-names");
//   const dean = document.getElementById("dean");
//   const pen = document.getElementById("PEN");
//   const loc = document.getElementById("Rep"); // corrected ID
//   const chair = document.getElementById("Chair");
//   // Clear previous errors
//   clearErrors();

//   let isValid = true;

//   if (!dean.value.trim()) {
//     document.getElementById("err-dean").style.display = "block";
//     isValid = false;
//   }

//   if (!pen.value.trim()) {
//     document.getElementById("err-PEN").style.display = "block";
//     isValid = false;
//   }

//   if (!loc.value.trim()) {
//     document.getElementById("err-Rep").style.display = "block";
//     isValid = false;
//   }

//   if (!chair.value.trim()) {
//     document.getElementById("err-Chair").style.display = "block";
//     isValid = false;
//   }

//   return isValid;
// }
// function clearErrors() {
//   let errors = document.getElementsByClassName("error");
//   for (let i=0; i<errors.length; i++) {
//       errors[i].style.display = "none";
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const divisionSelect = document.getElementById("division");
  const divisionNames = document.getElementById("division-names");
  const dean = document.getElementById("dean");
  const pen = document.getElementById("PEN");
  const loc = document.getElementById("Rep");
  const chair = document.getElementById("Chair");
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

document.getElementById("Loc-story").onsubmit = (e) => {
  const form = document.getElementById("LOC-story");
  const divisionSelect = document.getElementById("division");
  const divisionNames = document.getElementById("division-names");
  const dean = document.getElementById("dean");
  const program = document.getElementById("program");
  const pen = document.getElementById("PEN");
  const loc = document.getElementById("Rep"); // corrected ID
  const chair = document.getElementById("Chair");
  const contact = document.getElementById("contact");
  const payee = document.getElementById("payee");
  const paid = document.getElementById("paid"); // select
  const report = document.getElementById("report"); // select
  const notes = document.getElementById("notes");
  // Clear previous errors
  clearErrors();

  let isValid = true;

  if (!dean.value.trim()) {
    document.getElementById("err-Dean").style.display = "block";
    isValid = false;
  }

  if (!pen.value.trim()) {
    document.getElementById("err-PEN").style.display = "block";
    isValid = false;
  }

  if (!loc.value.trim()) {
    document.getElementById("err-Rep").style.display = "block";
    isValid = false;
  }

  if (!chair.value.trim()) {
    document.getElementById("err-Chair").style.display = "block";
    isValid = false;
  }

  if (!contact.value.trim()) {
    document.getElementById("err-Contact").style.display = "block";
    isValid = false;
  }

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

  return isValid;
};
function clearErrors() {
  let errors = document.getElementsByClassName("error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}

// EDIT BUTTON JAVASCRIPT
function toggleFormDisplay() {
  const adminForm = document.getElementById("adminForm");
  if (adminForm.style.display === "none" || adminForm.style.display === "") {
    adminForm.style.display = "block";
  } else {
    adminForm.style.display = "none";
  }
}

// ADMIN FORM TOGGLE DISPLAY FUNCTION
