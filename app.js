
// Import the mysql2 module
// mysql2 allows Node.js to communicate with a MySQL database
import mysql2 from 'mysql2';

// Import the express module
import express from 'express';

import dotenv from 'dotenv';

// Load environment variables from .env file
// This MUST be called before accessing process.env
dotenv.config();

// Create a CONNECTION POOL to the database
// Now using environment variables from the .env file
// process.env.VARIABLE_NAME accesses variables from .env
const pool = mysql2.createPool({
    // These values come from the .env file
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT


}).promise();

// Create an instance of an Express application
const app = express();

// Set EJS as our view engine
app.set('view engine', 'ejs');

// Enable static file serving
app.use(express.static('public'));

// Allow the app to parse form data (req.body)
app.use(express.urlencoded({ extended: true }));



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



// Database test - http://localhost:3007/db-test to test this route
app.get('/db-test', async(req, res) => {


    /* 
     * 'async' tells JavaScript that this function will do asynchronous work
     * Asynchronous means "it takes time to complete" (like waiting for
     * database). By marking it 'async', we can use 'await' inside it
     * 
     * 'await' keyword means "pause here and wait for the database to respond"
     * pool.query() returns a Promise ("I'll get back to you!")
     * 'await' waits for the Promise to complete before moving on
     * 
     * DESTRUCTURING with [orders]:
     * pool.query() returns an ARRAY with 2 items:
     *   [0] = the actual data rows from the database
     *   [1] = metadata about the query (field names, types, etc.)
     * By writing [orders], we're saying "just give me the first item"


     * This is called "array destructuring"
     * So 'orders' now contains just the data rows, like:
     * [ {id: 1, customer: 'John', pizza: 'Pepperoni'}, 
     *   {id: 2, customer: 'Jane', pizza: 'Veggie'} ]
     */


    // try/catch block for error handling
    try {


        const [orders] = await pool.query('SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName;');


        // Send the orders data back to the browser as JSON
        res.send(orders);


    } catch(err) {


        // If ANY error happened in the 'try' block, this code runs
        // Log the error to the server console (for developers to see)
        console.error('Database error:', err);


        // Send an error response to the browser
        // status(500) means "Internal Server Error"
        res.status(500).send('Database error: ' + err.message);
    }
});

//checks to make sure your on your local mysql database
app.get("/which-db", async (req, res) => {
  try {
    const [db] = await pool.query("SELECT DATABASE() AS db;");
    const [host] = await pool.query("SELECT @@hostname AS host;");
    res.json({
      connected_database: db[0].db,
      mysql_host: host[0].host
    });
  } catch (err) {
    res.send("DB ERROR: " + err.message);
  }
});

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', async(req, res) => {


    try {
        const [orders] = await pool.query('SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName;');

        const success = req.query.success === 'true';

        // Send the orders data back to the browser as JSON
        //res.render('home', { orders });
        res.render('admin', { orders, selectedDivision: "none", success});


    } catch(err) {

        console.error('Database error:', err);

        res.status(500).send('Database error: ' + err.message);
    }
});

// Route to form page
app.get('/form', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName;');
    const selectedDivision = req.query.division || "none";
    
    res.render('home', { orders });

  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Database error: ' + err.message);
  }
});


app.post('/submit-order', async (req, res) => {

    // Create a JSON object to store the data
    const order = req.body;
    // order.timestamp = new Date()

    // Convert checkbox to 1 / 0 for MySql
    const underReviewValue = order.underReview ? 1 : 0;

    try {
      await pool.query(
        `UPDATE AcademicPrograms
         SET
            Payees = ?,
            Paid = ?,
            Report = ?,
            Notes = ?,
            UnderReview = ?
         WHERE DivisionName = ?
         AND AcademicPrograms = ?`,
        [
            order.payee,
            order.paid =="Yes" ? 1 : 0,
            order.report =="Yes" ? 1 : 0,
            order.notes,
            underReviewValue,
            order.division,
            order.program
        ]
      );

    // Add order to array
    // orders[order.division] = {
    //   Dean: order.dean,
    //   PEN: order.PEN,
    //   Rep: order.Rep,
    //   Chair: order.Chair,
    //   AcademicProgram: order.program,
    //   Payees: order.payee, // add this if you have a payee field in your form
    //   Paid: order.paid,
    //   Report: order.report,
    //   Notes: order.notes,
    //   UnderReview: order.underReview ? true : false

    // };
    // console.log(orders);

    // Send user to confirmation page
    //res.render('confirmation', { order });

      // Direct user back to summary page(pass success indicator as URL parameter)
      res.redirect('/?success=true');
    } catch (err) {
      console.error("SQL Update Error:", err);
      res.status(500).send("Database update failed.");
    }
});

// Define an "submit-order2" route (admin.ejs)
app.post('/submit-order2', async(req, res) => {


    const selectedDivision = req.body.division || "none";
    let [orders] = [];

    // if user selects all, the data will call all info
    if (selectedDivision == "*") {
      [orders] = await pool.query('SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName;');
    } 
    // call info only for the selected division
    else {
      [orders] = await pool.query('SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName WHERE a.DivisionName = ?;',
      [selectedDivision]);
    }

    res.render('admin', { orders, selectedDivision, success: false});
    
});


// app.get('/test', async (req, res) => {
//   try {
//     const [orders] = await pool.query('SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName;');
//     const selectedDivision = req.query.division || "none";
//     const divisionData = orders.find(order => order.DivisionName === selectedDivision);
//     res.render('test', { orders, selectedDivision, divisionData });
//   } catch (err) {
//     console.error('Database error:', err);
//     res.status(500).send('Database error: ' + err.message);
//   }
// });


// //this belongs to the test
// app.post('/submit-order3', async (req, res) => {
//     const selectedDivision = req.body.division || "none";
//     let [orders] = [];

//     // if user selects all, the data will call all info
//     if (selectedDivision == "*" && selectedDivision == "none") {
//       [orders] = await pool.query('SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName;');
//     } 
//     // call info only for the selected division
//     else {
//       [orders] = await pool.query('SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName WHERE a.DivisionName = ?;',
//       [selectedDivision]);
//     }

//     res.render('test', { orders, selectedDivision});
// });

// Start the server and make it listen on the port 
// specified above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 