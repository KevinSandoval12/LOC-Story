document.getElementById("LOC-story").onsubmit = () => {};
// Constants
// let dean = document.getElementById("dean");
// let PEN = document.getElementById("PEN");
// let LOC = document.getElementById("LOC");
// let Chair = document.getElementById("Chair");
let divisionSelect = document.getElementById("division-selector");

// (Fine Arts, Humanities, Social Science, English, Science, Technology, Health Science, Trades, etc.)
let List = {
  FineArt: [
    "Miebeth Castillo-Booth",
    "Angie Brenner",
    "Josh Archer",
    "Michael Wood",
  ],
};
if (divisionSelect.value == "FineArt") {
  document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", (e) => {
      let division = (document.getElementById("division").value = "FineArt");
      let dean = (document.getElementById("dean").value = List.FineArt[0]);
      let PEN = (document.getElementById("PEN").value = List.FineArt[1]);
      let LOC = (document.getElementById("LOC").value = List.FineArt[2]);
      let Chair = (document.getElementById("Chair").value = List.FineArt[3]);
    });
  });
}

console.log(dean);
console.log(division);

// document.addEventListener("DOMContentLoaded", () => {
//   division.addEventListener("change", () => {
//     const division = document.getElementById("division-selector");
//     const divisionNames = document.getElementById("division-names");
//     if (division.value !== "none") {
//       divisionNames.style.display = "";
//     } else {
//       divisionNames.style.display = "none";
//     }
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  // Get all main elements
  const form = document.getElementById("LOC-story");
  const division = document.getElementById("division-selector");
  const divisionNames = document.getElementById("division-names");
  const dean = document.getElementById("dean");
  const pen = document.getElementById("PEN");
  const loc = document.getElementById("Rep"); // corrected ID
  const chair = document.getElementById("Chair");

  // Hide the division info section by default
  divisionNames.style.display = "none";

  // Show/hide section when a division is selected
  division.addEventListener("change", () => {
    if (division.value !== "none") {
      divisionNames.style.display = "block";
    } else {
      divisionNames.style.display = "none";
    }
  });

  // Optional: handle form submission for testing
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop refresh

    console.log("Division Selected:", division.value);
    console.log("Dean:", dean.value);
    console.log("PEN Contact:", pen.value);
    console.log("LOC Rep:", loc.value);
    console.log("Chair:", chair.value);
  });
});
