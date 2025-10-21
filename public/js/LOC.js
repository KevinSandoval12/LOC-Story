document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const form = document.getElementById("LOC-story");
  const divisionSelect = document.getElementById("division-selector");
  const divisionNames = document.getElementById("division-names");
  const dean = document.getElementById("dean");
  const pen = document.getElementById("PEN");
  const loc = document.getElementById("Rep"); // matches HTML ID
  const chair = document.getElementById("Chair");

  // Division data
  const Divisions = {
    FineArt: [
      "Miebeth Castillo-Booth",
      "Angie Brenner",
      "Josh Archer",
      "Michael Wood",
    ],
    Technology: [
      "Miebeth Castillo-Booth",
      "Angie Brenner",
      "Josh Archer",
      "Michael Wood",
    ],
    // fill in other divisions as needed
    Humanities: ["", "", "", ""],
    SocialScience: ["", "", "", ""],
    English: ["", "", "", ""],
    Science: ["", "", "", ""],
    HealthScience: ["", "", "", ""],
    Trades: ["", "", "", ""]
  };

  // Hide the section by default
  divisionNames.style.display = "none";

  // When the dropdown changes...
  divisionSelect.addEventListener("change", () => {
    const selected = divisionSelect.value;

    if (selected !== "none") {
      divisionNames.style.display = "block"; // show fields

      // Auto-fill fields if division exists
      if (Divisions[selected]) {
        document.getElementById("division").value = selected;
        dean.value = Divisions[selected][0];
        pen.value = Divisions[selected][1];
        loc.value = Divisions[selected][2];
        chair.value = Divisions[selected][3];
      }
    } else {
      divisionNames.style.display = "none"; // hide again
    }
  });
  
  
  //save form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedDivision = divisionSelect.value;
  
    if (selectedDivision !== "none") {
      // Get the current values from the form fields
      const deanValue = dean.value;
      const penValue = pen.value;
      const locValue = loc.value;
      const chairValue = chair.value;
      
      // update the values in the 
      Divisions[selectedDivision] = [deanValue, penValue, locValue, chairValue];
      console.log(Divisions);
    }
    // }
  });
});

// ERROR MESSAGE
document.getElementById('LOC-story').onsubmit = () => {
  const form = document.getElementById("LOC-story");
  const divisionSelect = document.getElementById("division-selector");
  const divisionNames = document.getElementById("division-names");
  const dean = document.getElementById("dean");
  const pen = document.getElementById("PEN");
  const loc = document.getElementById("Rep"); // corrected ID
  const chair = document.getElementById("Chair");
  // Clear previous errors
  clearErrors();

  let isValid = true;

  if (!dean.value.trim()) {
    document.getElementById("err-dean").style.display = "block";
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

  return isValid;
}
function clearErrors() {
  let errors = document.getElementsByClassName("error");
  for (let i=0; i<errors.length; i++) {
      errors[i].style.display = "none";
  }
}