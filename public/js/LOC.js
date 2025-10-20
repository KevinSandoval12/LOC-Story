document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const form = document.getElementById("LOC-story");
  const divisionSelect = document.getElementById("division-selector");
  const divisionNames = document.getElementById("division-names");
  const dean = document.getElementById("dean");
  const pen = document.getElementById("PEN");
  const loc = document.getElementById("Rep"); // corrected ID
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
    Humanities: [],
    SocialScience: [],
    English: [],
    Science: [],
    HealthScience: [],
    Trades: [],
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

  // Optional: stop page reload + log values
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Division Selected:", divisionSelect.value);
    console.log("Dean:", dean.value);
    console.log("PEN Contact:", pen.value);
    console.log("LOC Rep:", loc.value);
    console.log("Chair:", chair.value);
  });
});
