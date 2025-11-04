// This grabs orders data from app.js to LOC.js
const orders = window.orders;
console.log(orders);

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
      prefillDivsionData(selected);
      clearErrors();
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

document.getElementById("Loc-story").onsubmit = () => {
  const form = document.getElementById("LOC-story");
  const divisionSelect = document.getElementById("division");
  const divisionNames = document.getElementById("division-names");
  const dean = document.getElementById("dean");
  const program = document.getElementById("program");
  const pen = document.getElementById("PEN");
  const loc = document.getElementById("Rep"); // corrected ID
  const chair = document.getElementById("Chair");
  // const contact = document.getElementById("contact");
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
function prefillDivsionData(division) {
  const data = orders[division];
  if (!data) return;

  document.getElementById("program").value = data.AcademicProgram || "";
  document.getElementById("payee").value = data.Payees || "";
  document.getElementById("paid").value = data.Paid || "none";
  document.getElementById("report").value = data.Report || "none";
  document.getElementById("notes").value = data.Notes || "";
  document.getElementById("dean").value = data.Dean || "";
  document.getElementById("PEN").value = data.PEN || "";
  document.getElementById("Rep").value = data.Rep || "";
  document.getElementById("Chair").value = data.Chair || "";
}
