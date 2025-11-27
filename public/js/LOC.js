// This pulls programData from the server if it exists; otherwize us null so script doesnt break
const programData = window.programData || null;

// This grabs orders data from app.js to LOC.js
const orders = window.orders;
console.log(orders);
console.log(orders[0]);
console.log(orders[0].Dean);


document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const divisionSelect = document.getElementById("division");
  const programSelect = document.getElementById("program");
  const divisionNames = document.getElementById("division-names");
  const dean = document.getElementById("dean");
  const pen = document.getElementById("PEN");
  const loc = document.getElementById("Rep");
  const chair = document.getElementById("Chair");
  const saveButton = document.getElementById("save-button");
  const cancelButton = document.getElementById("cancel-button");

  // If user clicked a program from the Under Review page, prefill everything
  if (programData) {

    console.log("PROGRAM DATA LOADED:", programData);

    // Show full form
    divisionNames.style.display = "grid";
    saveButton.style.display = "block";
    cancelButton.style.display = "block";

    // Set division
    divisionSelect.value = programData.DivisionName;

    divisionSelect.dispatchEvent(new Event("change"));

    // Select the correct academic program
    setTimeout(() => {
      programSelect.value = programData.AcademicPrograms;

      // Prefill the Division info
      document.getElementById("dean").value = programData.Dean || "";
      document.getElementById("PEN").value = programData.Pen || "";
      document.getElementById("Rep").value = programData.Rep || "";
      document.getElementById("Chair").value = programData.Chair || "";

      prefillAcademicData(programData.AcademicPrograms);

      // 5. Prefill Academic Program info
      document.getElementById("payee").value = programData.Payees || "";
      document.getElementById("notes").value = programData.Notes || "";
      document.getElementById("paid").value = programData.Paid ? "Yes" : "No";
      document.getElementById("report").value = programData.Report ? "Yes" : "No";
      document.getElementById("underReview").checked = programData.UnderReview ? true : false;
  }, 50);
}

  // Hide buttons and fields by default
  if (!programData) {
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
    divisionNames.style.display = "none";
  }  
  // When dropdown changes
  divisionSelect.addEventListener("change", () => {
    const selected = divisionSelect.value;

    const FineArt = [
      { value: "Music", text: "Music" },
    ];

    const Technology = [
      { value: "Aviation", text: "Aviation" },
      { value: "CAD Design and Engineering Tech.", text: "CAD Design and Engineering Tech." },
      { value: "Natural Resources", text: "Natural Resources" }
    ];

    const Humanities = [
      { value: "Communication Studies", text: "Communication Studies" },
    ];

    const SocialScience = [
      { value: "Anthropology", text: "Anthropology" },
      { value: "History", text: "History" },
      { value: "Political Science", text: "Political Science" },
      { value: "Psychology", text: "Psychology" }
    ];

    const English = [
      { value: "English", text: "English" },
    ];

    const Science = [
      { value: "Anatomy & Physiology", text: "Anatomy & Physiology" },
      { value: "Biology/Environmental Science", text: "Biology/Environmental Science" },
      { value: "Geology/Oceanography", text: "Geology/Oceanography" }
    ];

    const HealthScience = [
      { value: "Practical Nursing", text: "Practical Nursing" },
      { value: "Physical Therapist Assistant", text: "Physical Therapist Assistant" }
    ];

    const Trades = [
      { value: "Automotive Technology", text: "Automotive Technology" },
      { value: "Manufacturing", text: "Manufacturing" }
    ];


    function setProgramsOptions(options) {
      const program = document.getElementById("program");
      // Remove all current options
      program.innerHTML = '';
      // Add new options
      options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.text;
        program.appendChild(option);
      });
    }

    if (selected !== "none") {
      
      divisionNames.style.display = "grid";
      saveButton.style.display = "block";
      cancelButton.style.display = "block";
      prefillDivsionData(selected);
      
      // setProgramsOptions(alternatePrograms)
      
      switch (selected) {
        case "FineArt":
          setProgramsOptions(FineArt);
          break;
        case "Technology":
          setProgramsOptions(Technology);
          break;
        case "Humanities":
          setProgramsOptions(Humanities);
          break;
        case "SocialScience":
          setProgramsOptions(SocialScience);
          break;
        case "English":
          setProgramsOptions(English);
          break;
        case "Science":
          setProgramsOptions(Science);
          break;
        case "HealthScience":
          setProgramsOptions(HealthScience);
          break;
        case "Trades":
          setProgramsOptions(Trades);
          break;
        default:
          setProgramsOptions(FineArt);
          break;
      }
      //prefills programs when the pages load
      const program = programSelect.value;
      prefillAcademicData(program);


    } else {
      // Hide if 'none'
      divisionNames.style.display = "none";
      saveButton.style.display = "none";
      cancelButton.style.display = "none";
    }
  });
  //prefills when the program Selection dropdown changes
  programSelect.addEventListener("change", () => {
    const program = programSelect.value;
    if (program !== "none") {
      prefillAcademicData(program);
    }
  });
  clearErrors();
  

  // Cancel button behavior
  cancelButton.addEventListener("click", () => {
    divisionNames.style.display = "none";
    saveButton.style.display = "none";
    cancelButton.style.display = "none";
    divisionSelect.value = "none"; // reset dropdown
  });
});

// home page form on submit function
document.getElementById("Loc-story").onsubmit = () => {
  const form = document.getElementById("LOC-story");
  const divisionSelect = document.getElementById("division");
  const divisionNames = document.getElementById("division-names");
  const dean = document.getElementById("dean");
  const program = document.getElementById("program");
  const pen = document.getElementById("PEN");
  const loc = document.getElementById("Rep"); // corrected ID
  const chair = document.getElementById("Chair");
  const payee = document.getElementById("payee");
  const paid = document.getElementById("paid"); // select
  const report = document.getElementById("report"); // select
  const notes = document.getElementById("notes");
  // Clear previous errors
  clearErrors();

  let isValid = true;

  // Flags for validation checks
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
}; // end of on submit

// Clears validation errors function
function clearErrors() {
  let errors = document.getElementsByClassName("error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
}

// prefill home page form function
function prefillDivsionData(division) {
  //  loop over orders array
  for (const order of orders) {
    //  select DivisionName (division.DivisionName)
    const name = order.DivisionName;
    //  check if DivisionName is the same as the argument value (division).
    // if the value is the same
    if (name == division) {
      // set dean, PEN, Rep, Chair to value ex: orders[division].Dean
      document.getElementById("dean").value = order.Dean || "";
      document.getElementById("PEN").value = order.Pen || "";
      document.getElementById("Rep").value = order.Rep || "";
      document.getElementById("Chair").value = order.Chair || "";
      document.getElementById("underReview").checked = order.UnderReview == 1;
      
    }
  }

}

function prefillAcademicData(program) {
  //  loop over orders array
  for (const order of orders) {
    //  select DivisionName (division.DivisionName)
    const name = order.AcademicPrograms;
    //  check if DivisionName is the same as the argument value (division).
    // if the value is the same
    if (name == program) {
      // set dean, PEN, Rep, Chair to value ex: orders[division].Dean
      document.getElementById("payee").value = order.Payees || "";
      document.getElementById("notes").value = order.Notes || "";


      document.getElementById("paid").value = checkYesOrNo(order.Paid) || "none";
      document.getElementById("report").value = checkYesOrNo(order.Report) || "none";

      document.getElementById("underReview").checked = order.UnderReview == 1;
      
      break;
      
    }

  }
  function checkYesOrNo(Binary) {
    // if Binary == 1 (true):
    if (Binary == 1) {
      return "Yes";
    }
    // else if Binary == 0 (false):
    if (Binary == 0) {
      return "No";
    }
      
  }
}

// console.log(orders[0].Paid)
