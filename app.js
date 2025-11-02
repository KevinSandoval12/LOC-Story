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

// Create an array to store divisions
  const orders = {
    FineArt: [
      "Christie Gilliland",
      "Liz Peterson",
      "Monica Bowen",
      "Paul Metevier",
    ],
    Technology: [
      "Miebeth Castillo-Booth",
      "Angie Brenner",
      "Josh Archer",
      "Michael Wood",
    ],
    Humanities: ["Jamie Fitzgerald", "Liz Peterson", "Lisa Luengo", "Katie Cunnion"],
    SocialScience: ["Christie Gilliland", "Liz Peterson", "Joy Crawford ", "Mark Thomason"],
    English: ["Jamie Fitzgerald", "Liz Peterson", "Jake Frye", "Ian Sherman"],
    Science: ["Katy Shaw and Danny Najera", "Miebeth Bustillo-Booth", "Nicole Feider", "Heather Lambert"],
    HealthScience: ["Lionel Candido Flores", "Thom Jackson", "", "Leslie Kessler "],
    Trades: ["Lea Ann Simpson", "Mary Singer", "Ben Orr", "David Lewis"],
  };
  

// Define the port number where our server will listen
const PORT = 3007;

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get('/', (req, res) => {

    // Send a response to the client
    // res.send(`<h1>Welcome to Poppa\'s Pizza!</h1>`);
    res.render('home');
});

// Define an "admin" route
app.get('/admin', (req, res) => {

    res.render('admin', { orders });
    //res.send(orders);
    //res.sendFile(`${import.meta.dirname}/views/admin.html`);
});

// Define an "submit-order" route
app.post('/submit-order', (req, res) => {

    // Create a JSON object to store the data
    const order = req.body;
    // order.timestamp = new Date()

    // Add order to array
    orders[order.division] = [order.dean, order.PEN, order.Rep, order.Chair, order.program];
    console.log(orders);

    // Send user to confirmation page
    res.render('confirmation', { order });
});

// Start the server and make it listen on the port 
// specified above
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
}); 