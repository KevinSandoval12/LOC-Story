
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
// app.post('/submit-order', (req, res) => {

//     // Create a JSON object to store the data
//     const order = req.body;
//     // order.timestamp = new Date()

//     // Add order to array
//     orders[order.division] = {
//       Dean: order.dean,
//       PEN: order.PEN,
//       Rep: order.Rep,
//       Chair: order.Chair,
//       AcademicProgram: order.program,
//       Payees: order.payee, // add this if you have a payee field in your form
//       Paid: order.paid,
//       Report: order.report,
//       Notes: order.notes

//     };
//     console.log(orders);

//     // Send user to confirmation page
//     res.render('confirmation', { order });
// });
app.post('/submit-order', async(req, res) => {
    // Wrap everything in try/catch to handle potential database errors
    try {
        // Get the order data from the form submission
        // req.body contains all the form fields (fname, lname, email, etc.)
        const order = req.body;

        // Convert the toppings array into a comma-separated string
        // HTML checkboxes submit as an array, but MySQL stores as TEXT
        order.toppings = Array.isArray(order.toppings) ? 
        order.toppings.join(", ") : "";

        // Add a timestamp to track when this order was placed
        order.timestamp = new Date();

        // Log the order to the server console (helpful for debugging)
        console.log('New order received:', order);

        // Define an SQL INSERT query
        // The ? are PLACEHOLDERS that will be replaced with actual values
        // This prevents SQL injection (a common security vulnerability)
        const sql = `INSERT INTO orders 
                     (fname, lname, email, size, method, toppings, timestamp) 
                     VALUES (?, ?, ?, ?, ?, ?, ?)`;

        // Create an array of parameters for each ? placeholder in order
        const params = [
            order.fname,
            order.lname,
            order.email,
            order.size,
            order.method,
            order.toppings,
            order.timestamp
        ];
        
        // Execute the query with the parameters
        const [result] = await pool.execute(sql, params);

        // Optional: You can access the newly inserted row's ID
        console.log('Order inserted with ID:', result.insertId);

        // Pass the order data to the confirmation page 
        res.render('confirmation', { order: order });

    } catch(err) {

        // If ANYTHING goes wrong, this runs
        console.error('Error inserting order:', err);

        // Check if it's a duplicate email error
        if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).send('An order with this email already exists.');
        } else {
            // Generic error message for other issues
            res.status(500).send('Sorry, there was an error processing your order. Please try again.');
        }
    }
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