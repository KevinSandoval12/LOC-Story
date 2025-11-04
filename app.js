// Import the express module
// import express from "express";

// // Create an instance of an Express application
// const app = express();

// // Enable static files serving
// app.use(express.static("public"));

// // Define the port number where our server will listen
// const PORT = 3007;

// // Define a default "route" ('/')
// // req: contains information about the incoming request
// // res: allows us to send back a response to the client
// app.get("/", (req, res) => {
//   // Send "Helow, World!" as a resonce to the client
//   // res.send('<h1> Welcome to Poppa\'s Pizza!</h1>');
//   res.sendFile(`${import.meta.dirname}/views/home.html`);
// });

// // start the server and make it listen on the port
// // specified above
// app.listen(PORT, () => {
//   console.log(`Sever is running at http://localhost:${PORT}`);
// });


// Import the express module
import express from 'express';

// Create an instance of an Express application
const app = express();

// Set EJS as our view engine
app.set('view engine', 'ejs');

// Enable static file serving
app.use(express.static('public'));

// Allow the app to parse form data (req.body)
app.use(express.urlencoded({ extended: true }));

// // Create an array to store divisions
//   const orders = {
//     FineArt: [
//       "Christie Gilliland",
//       "Liz Peterson",
//       "Monica Bowen",
//       "Paul Metevier",
//       "Music",
//       "Sam = $333, Kelly = $333, Ruth = $333"
//     ],
//     Technology: [
//       "Miebeth Castillo-Booth",
//       "Angie Brenner",
//       "Josh Archer",
//       "Michael Wood",
//       "Aviation, CAD Design and Engineering Tech., Natural Resources",
//       "Tad Henry(CAD) = $1000, Seunghye Jang = $1000",
//     ],
//     Humanities: ["Jamie Fitzgerald", "Liz Peterson", "Lisa Luengo", "Katie Cunnion", "Communication Studies", "",],
//     SocialScience: ["Christie Gilliland", "Liz Peterson", "Joy Crawford ", "Mark Thomason", "Anthropology, History, PoliSci, Psychology", "Madeline = $500, Joy Crawford = $500 (Anthrology)/Lindsey = $500, Yoav = $500 (PoliSci)"],
//     English: ["Jamie Fitzgerald", "Liz Peterson", "Jake Frye", "Ian Sherman", "English", "Aley Martin"],
//     Science: ["Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert", "Anatomy & Physiology, Biology/Environmental Sci, Geology/Oceanography"],
//     HealthScience: ["Lionel Candido Flores", "Thom Jackson", "", "Leslie Kessler ", "Practical Nursing, Physical Therapist Assistant"],
//     Trades: ["Lea Ann Simpson", "Mary Singer", "Ben Orr", "David Lewis", "Automotive Technology, Manufacturing"],
//   };
// Create an array to store divisions

const orders = {
  FineArt: {
    Dean: "Christie Gilliland",
    PEN: "Liz Peterson",
    Rep: "Monica Bowen",
    Chair: "Paul Metevier",
    AcademicProgram: "Music",
    Payees: "Sam = $333 (Music), Kelly = $333 (Music), Ruth = $333 (Music)",
    Paid: "Yes",
    Report: "Yes",
    Notes: "Preparing gallery showcase"
  },
  Technology: {
    Dean: "Miebeth Castillo-Booth",
    PEN: "Angie Brenner",
    Rep: "Josh Archer",
    Chair: "Michael Wood",
    AcademicProgram: "Aviation, CAD Design and Engineering Tech., Natural Resources",
    Payees: "Tad Henry = $1000 (Aviation), Seunghye Jang = $1000 (CAD Design and Engineering Tech.), None (Natural Resources",
    Paid: "Yes",
    Report: "No",
    Notes: "Preparing next quarter's project updates"
  },
  Humanities: {
    Dean: "Jamie Fitzgerald",
    PEN: "Liz Peterson",
    Rep: "Lisa Luengo",
    Chair: "Katie Cunnion",
    AcademicProgram: "Communication Studies",
    Payees: "None (Humanities)",
    Paid: "Yes",
    Report: "No",
    Notes: "Completed department review for Fall"
  },
  SocialScience: {
    Dean: "Christie Gilliland",
    PEN: "Liz Peterson",
    Rep: "Joy Crawford",
    Chair: "Mark Thomason",
    AcademicProgram: "Anthropology, History, Political Science, Psychology",
    Payees: "Madeline = $500 (Anthrology), Joy Crawford = $500 (Anthrology), None (History), Lindsey = $500, Yoav = $500 (PoliticalScience), Joy = $500, Jerry = $500 (Psychology)",
    Paid: "No",
    Report: "Yes",
    Notes: "Pending research approval update"
  },
  English: {
    Dean: "Jamie Fitzgerald",
    PEN: "Liz Peterson",
    Rep: "Jake Frye",
    Chair: "Ian Sherman",
    AcademicProgram: "English",
    Payees: "Aley Martin: $175 (English), Claire Salcedo: $175 (English), Ericka Nelson: $175 (English), Jake: $475 (English)",
    Paid: "No",
    Report: "No",
    Notes: "Revising course outcomes for next term"
  },
  Science: {
    Dean: "Katy Shaw and Danny Najera",
    PEN: "Miebeth Bustillo-Booth",
    Rep: "Nicole Feider",
    Chair: "Heather Lambert",
    AcademicProgram: "Anatomy & Physiology, Biology/Environmental Science, Geology/Oceanography",
    Payees: "None (Anatomy & Physiology), Leo - $334.00 (Biology/Environmental), Stephanie Hoffman - $333.00 (Biology/Environmental), Danny Najera - $333.00 (Biology/Environmental), None (Geology/Oceanography)", 
    Paid: "No",
    Report: "Yes",
    Notes: "Research grant proposal submitted"
  },
  HealthScience: {
    Dean: "Lionel Candido Flores",
    PEN: "Thom Jackson",
    Rep: "",
    Chair: "Leslie Kessler",
    AcademicProgram: "Practical Nursing, Physical Therapist Assistant",
    Payees: "None (Practical Nursing), Pam Kikillus = $500 (Physical Therapist Assistant), Anna Neil = $500 (Physical Therapist Assistant)",
    Paid: "No",
    Report: "Yes",
    Notes: "Report submitted for spring term"
  },
  Trades: {
    Dean: "Lea Ann Simpson",
    PEN: "Mary Singer",
    Rep: "Ben Orr",
    Chair: "David Lewis",
    AcademicProgram: "Automotive Technology, Manufacturing",
    Payees: "None (Automotive Technology), None (Manufacturing)",
    Paid: "No",
    Report: "Yes",
    Notes: "New equipment installed in shop"
  },
};
  

// Define the port number where our server will listen
const PORT = 3007;

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {

    // Send a response to the client
    // res.send(`<h1>Welcome to Poppa\'s Pizza!</h1>`);
    // res.render('home');
    res.render('home', { orders });
});

// Define an "admin" route
app.get('/admin', (req, res) => {

    res.render('admin', { orders });
    //res.send(orders);
    //res.sendFile(`${import.meta.dirname}/views/admin.html`);
});

// Define an "submit-order" route (home.ejs)
app.post('/submit-order', (req, res) => {

    // Create a JSON object to store the data
    const order = req.body;
    // order.timestamp = new Date()

    // Add order to array
    orders[order.division] = {
      Dean: order.dean,
      PEN: order.PEN,
      Rep: order.Rep,
      Chair: order.Chair,
      AcademicProgram: order.program,
      Payees: order.payee, // add this if you have a payee field in your form
      Paid: order.paid,
      Report: order.report,
      Notes: order.notes

    };
    console.log(orders);

    // Send user to confirmation page
    res.render('confirmation', { order });
});

// Define an "submit-order2" route (admin.ejs)
app.post('/submit-order2', (req, res) => {

    // Create a JSON object to store the data
    const order = req.body;
    // order.timestamp = new Date()

    // Add order to array
    orders[order.division] = {
      // if (order.dean) is empty, then use (orders[order.division].Dean) to keep the original value
      Dean: order.dean || orders[order.division].Dean,
      PEN: order.PEN || orders[order.division].PEN,
      Rep: order.Rep || orders[order.division].Rep,
      Chair: order.Chair || orders[order.division].Chair,
      AcademicProgram: order.program || orders[order.division].AcademicProgram,
      Payees: order.payee, // add this if you have a payee field in your form
      Paid: order.paid,
      Report: order.report,
      Notes: order.notes
    };
    console.log(orders);

    // updates the form, but waits 3 seconds before refreshing the page so the table is updated.
    setTimeout(() => res.redirect('/admin'), 3000);
    
});

// Start the server and make it listen on the port 
// specified above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 