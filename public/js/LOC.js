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

  // // Division data
  // const Divisions = {
  //   FineArt: [
  //     "Miebeth Castillo-Booth",
  //     "Angie Brenner",
  //     "Josh Archer",
  //     "Michael Wood",
  //   ],
  //   Technology: [
  //     "Miebeth Castillo-Booth",
  //     "Angie Brenner",
  //     "Josh Archer",
  //     "Michael Wood",
  //   ],
  //   Humanities: ["", "", "", ""],
  //   SocialScience: ["", "", "", ""],
  //   English: ["", "", "", ""],
  //   Science: ["", "", "", ""],
  //   HealthScience: ["", "", "", ""],
  //   Trades: ["", "", "", ""],
  // };

  // Hide buttons and fields by default
  saveButton.style.display = "none";
  cancelButton.style.display = "none";
  divisionNames.style.display = "none";

  // When dropdown changes
  divisionSelect.addEventListener("change", () => {
    const selected = divisionSelect.value;

    if (selected !== "none") {
      divisionNames.style.display = "block";
      saveButton.style.display = "block";
      cancelButton.style.display = "block";

      if (Divisions[selected]) {
        // Fill fields with division info
        dean.value = Divisions[selected][0];
        pen.value = Divisions[selected][1];
        loc.value = Divisions[selected][2];
        chair.value = Divisions[selected][3];
      }
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
