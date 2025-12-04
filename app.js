// Import the mysql2 module
// mysql2 allows Node.js to communicate with a MySQL database
import mysql2 from "mysql2";

// Import the express module
import express from "express";

import dotenv from "dotenv";

// Load environment variables from .env file
// This MUST be called before accessing process.env
dotenv.config();

// Create a CONNECTION POOL to the database
// Now using environment variables from the .env file
// process.env.VARIABLE_NAME accesses variables from .env
const pool = mysql2
  .createPool({
    // These values come from the .env file
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  })
  .promise();

// Create an instance of an Express application
const app = express();

// Set EJS as our view engine
app.set("view engine", "ejs");

// Enable static file serving
app.use(express.static("public"));

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
    Notes: "Preparing gallery showcase",
  },
  Technology: {
    Dean: "Miebeth Castillo-Booth",
    PEN: "Angie Brenner",
    Rep: "Josh Archer",
    Chair: "Michael Wood",
    AcademicProgram:
      "Aviation, CAD Design and Engineering Tech., Natural Resources",
    Payees:
      "Tad Henry = $1000 (Aviation), Seunghye Jang = $1000 (CAD Design and Engineering Tech.), None (Natural Resources",
    Paid: "Yes",
    Report: "No",
    Notes: "Preparing next quarter's project updates",
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
    Notes: "Completed department review for Fall",
  },
  SocialScience: {
    Dean: "Christie Gilliland",
    PEN: "Liz Peterson",
    Rep: "Joy Crawford",
    Chair: "Mark Thomason",
    AcademicProgram: "Anthropology, History, Political Science, Psychology",
    Payees:
      "Madeline = $500 (Anthrology), Joy Crawford = $500 (Anthrology), None (History), Lindsey = $500, Yoav = $500 (PoliticalScience), Joy = $500, Jerry = $500 (Psychology)",
    Paid: "No",
    Report: "Yes",
    Notes: "Pending research approval update",
  },
  English: {
    Dean: "Jamie Fitzgerald",
    PEN: "Liz Peterson",
    Rep: "Jake Frye",
    Chair: "Ian Sherman",
    AcademicProgram: "English",
    Payees:
      "Aley Martin: $175 (English), Claire Salcedo: $175 (English), Ericka Nelson: $175 (English), Jake: $475 (English)",
    Paid: "No",
    Report: "No",
    Notes: "Revising course outcomes for next term",
  },
  Science: {
    Dean: "Katy Shaw and Danny Najera",
    PEN: "Miebeth Bustillo-Booth",
    Rep: "Nicole Feider",
    Chair: "Heather Lambert",
    AcademicProgram:
      "Anatomy & Physiology, Biology/Environmental Science, Geology/Oceanography",
    Payees:
      "None (Anatomy & Physiology), Leo - $334.00 (Biology/Environmental), Stephanie Hoffman - $333.00 (Biology/Environmental), Danny Najera - $333.00 (Biology/Environmental), None (Geology/Oceanography)",
    Paid: "No",
    Report: "Yes",
    Notes: "Research grant proposal submitted",
  },
  HealthScience: {
    Dean: "Lionel Candido Flores",
    PEN: "Thom Jackson",
    Rep: "",
    Chair: "Leslie Kessler",
    AcademicProgram: "Practical Nursing, Physical Therapist Assistant",
    Payees:
      "None (Practical Nursing), Pam Kikillus = $500 (Physical Therapist Assistant), Anna Neil = $500 (Physical Therapist Assistant)",
    Paid: "No",
    Report: "Yes",
    Notes: "Report submitted for spring term",
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
    Notes: "New equipment installed in shop",
  },
};

// Define the port number where our server will listen
const PORT = 3007;

// Database test - http://localhost:3007/db-test to test this route
app.get("/db-test", async (req, res) => {
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
    const [orders] = await pool.query(
      "SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName;"
    );

    // Send the orders data back to the browser as JSON
    res.send(orders);
  } catch (err) {
    // If ANY error happened in the 'try' block, this code runs
    // Log the error to the server console (for developers to see)
    console.error("Database error:", err);

    // Send an error response to the browser
    // status(500) means "Internal Server Error"
    res.status(500).send("Database error: " + err.message);
  }
});

//checks to make sure your on your local mysql database
app.get("/which-db", async (req, res) => {
  try {
    const [db] = await pool.query("SELECT DATABASE() AS db;");
    const [host] = await pool.query("SELECT @@hostname AS host;");
    res.json({
      connected_database: db[0].db,
      mysql_host: host[0].host,
    });
  } catch (err) {
    res.send("DB ERROR: " + err.message);
  }
});

// Define a default "route" ('/')
// req: contains information about the incoming request
// res: allows us to send back a response to the client
app.get("/", async (req, res) => {
  try {
    // LOC Summary Query
    const [orders] = await pool.query(
      "SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName;"
    );

    // Under Review Query
    const [programs] = await pool.query(
      "SELECT ProgramID, DivisionName, AcademicPrograms, UnderReview FROM AcademicPrograms WHERE UnderReview = 1"
    );

    const success = req.query.success === "true";

    const [recentRows] = await pool.query(
      `
      WITH per_division AS (
        SELECT
          ProgramID,
          DivisionName,
          ProgramName,
          FieldName,
          OldValue,
          NewValue,
          ChangedAt,
          ROW_NUMBER() OVER (PARTITION BY DivisionName ORDER BY ChangedAt DESC) AS rn
        FROM RecentChanges
      ),
      top5_per_div AS (
        SELECT * FROM per_division WHERE rn <= 5
      ),
      division_latest AS (
        SELECT DivisionName, MAX(ChangedAt) AS latest
        FROM top5_per_div
        GROUP BY DivisionName
        ORDER BY latest DESC
        LIMIT 3
      )
      SELECT t.ProgramID, t.DivisionName, t.ProgramName, t.FieldName, t.OldValue, t.NewValue, t.ChangedAt
      FROM top5_per_div t
      JOIN division_latest d ON t.DivisionName = d.DivisionName
      ORDER BY d.latest DESC, t.DivisionName, t.ChangedAt DESC
      `
    );

    // group and track latest time for each group
    const groupsMap = new Map();
    recentRows.forEach((r) => {
      const key = `${r.DivisionName}__${r.ProgramName}`;
      if (!groupsMap.has(key)) {
        groupsMap.set(key, {
          division: r.DivisionName,
          program: r.ProgramName,
          items: [],
          latest: r.ChangedAt,
        });
      }
      const g = groupsMap.get(key);
      g.items.push({
        field: r.FieldName,
        oldVal: r.OldValue,
        newVal: r.NewValue,
        changedAt: r.ChangedAt,
      });
      if (new Date(r.ChangedAt) > new Date(g.latest)) g.latest = r.ChangedAt;
    });

    // convert to sorted array (most recent groups first)
    const groupedRecent = Array.from(groupsMap.values()).sort(
      (a, b) => new Date(b.latest) - new Date(a.latest)
    );

    res.render("summary", {
      orders,
      selectedDivision: "none",
      success,
      programs,
      groupedRecent,
    });

    // // group by Division + Program
    // const groupedRecent = {};
    // recentRows.forEach((r) => {
    //   // use consistent grouping key
    //   const key = `${r.DivisionName}__${r.ProgramName}`;
    //   if (!groupedRecent[key]) {
    //     groupedRecent[key] = {
    //       division: r.DivisionName,
    //       program: r.ProgramName,
    //       items: [],
    //     };
    //   }
    //   groupedRecent[key].items.push({
    //     field: r.FieldName,
    //     oldVal: r.OldValue,
    //     newVal: r.NewValue,
    //     changedAt: r.ChangedAt,
    //   });
    // });

    // // Send the orders data back to the browser as JSON
    // //res.render('home', { orders });
    // res.render("admin", {
    //   orders,
    //   selectedDivision: "none",
    //   success,
    //   programs,
    //   groupedRecent,
    // });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Database error: " + err.message);
  }
});

// Route to form page
app.get("/form", async (req, res) => {
  try {
    const [orders] = await pool.query(
      "SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName;"
    );
    const selectedDivision = req.query.division || "none";

    res.render("form", { orders, programData: null });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Database error: " + err.message);
  }
});

// // Route to under review page
// app.get("/under-review", async (req, res) => {
//   try {
//     //DB query
//     const [programs] = await pool.query(
//       "SELECT ProgramID, DivisionName, AcademicPrograms, UnderReview FROM AcademicPrograms WHERE UnderReview = 1"
//     );
//     // Send programs to EJS

//     res.render("underReview", { programs }); // temp placeholder
//   } catch (err) {
//     console.error("Error loading Under Review page:", err);
//     res.status(500).send("Error loading Under Review page.");
//   }
// });

// Prefilled form from Under Review list
app.get("/form-from-under-review", async (req, res) => {
  const programID = req.query.programID;

  if (!programID) {
    return res.redirect("/under-review");
  }

  try {
    const [rows] = await pool.query(
      `
      SELECT * FROM AcademicPrograms a
      JOIN Division d ON a.DivisionName = d.DivisionName
      WHERE a.ProgramID = ?`,
      [programID]
    );

    if (rows.length === 0) {
      return res.redirect("/under-review");
    }

    const programData = rows[0];

    const [orders] = await pool.query(
      `SELECT * FROM AcademicPrograms a
       JOIN Division d ON a.DivisionName = d.DivisionName`
    );

    res.render("form", {
      orders, //js pulls from programData
      programData,
    });
  } catch (err) {
    console.error("Error loading program:", err);
    res.status(500).send("Failed to load program");
  }
});

app.post("/submit-order", async (req, res) => {
  // Create a JSON object to store the data
  const order = req.body;
  // order.timestamp = new Date()

  // Convert checkbox to 1 / 0 for MySql
  const underReviewValue = order.underReview ? 1 : 0;

  try {
    // Recent Change JS
    const [oldRows] = await pool.query(
          `SELECT a.ProgramID, a.Payees, a.Paid, a.Report, a.Notes,
          d.Dean, d.PEN, d.Rep, d.Chair
          FROM AcademicPrograms a
          JOIN Division d ON a.DivisionName = d.DivisionName
          WHERE a.DivisionName = ? AND a.AcademicPrograms = ?`,
      [order.division, order.program]
    );

    const oldData = oldRows[0]; // the current row in DB

    const [oldDivisionRows] = await pool.query(
    `SELECT Dean, PEN, Rep, Chair
    FROM Division
    WHERE DivisionName = ?`,
    [order.division]
  );
    const oldDivisionData = oldDivisionRows[0];




    // A helper list of fields we want to track
    // const fieldsToCompare = ["Dean", "Pen", "Rep", "Chair", "Payees", "Paid", "Report", "Notes"];

    // for (const field of fieldsToCompare) {
    //   const oldValue = oldData[field]; 
    //   let newValue;

    //   if (field === "Paid") {
    //     newValue = order.paid === "Yes" ? 1 : 0;
    //   } else if (field === "Report") {
    //     newValue = order.report === "Yes" ? 1 : 0;
    //   } else {
    //     newValue = order[field.toLowerCase()];
    //   }

    //   if (oldValue != newValue) {
    //     await pool.query(
    //       `INSERT INTO RecentChanges 
    //        (ProgramID, DivisionName, ProgramName, FieldName, OldValue, NewValue, ChangedAt)
    //        VALUES (?, ?, ?, ?, ?, ?, NOW())`,
    //       [
    //         oldData.ProgramID,
    //         order.division,
    //         order.program,
    //         field,
    //         oldValue,
    //         newValue,
    //       ]
    //     );
    //   }
    // }

    // ------------------------------------

  const fieldsToCompare = ["Dean", "PEN", "Rep", "Chair", "Payees", "Paid", "Report", "Notes"];

  for (const field of fieldsToCompare) {
    let oldValue, newValue;

    if (["Dean", "PEN", "Rep", "Chair"].includes(field)) {
      oldValue = oldDivisionData[field];        // Division fields
      newValue = order[field.toLowerCase()];
    } else if (field === "Paid") {
      oldValue = oldData.Paid;
      newValue = order.paid === "Yes" ? 1 : 0;
    } else if (field === "Report") {
      oldValue = oldData.Report;
      newValue = order.report === "Yes" ? 1 : 0;
    } else {
      oldValue = oldData[field];
      newValue = order[field.toLowerCase()];
    }

    if (oldValue != newValue) {
      await pool.query(
        `INSERT INTO RecentChanges 
        (ProgramID, DivisionName, ProgramName, FieldName, OldValue, NewValue, ChangedAt)
        VALUES (?, ?, ?, ?, ?, ?, NOW())`,
        [
          oldData.ProgramID,
          order.division,
          order.program,
          field,
          oldValue,
          newValue,
        ]
      );
    }
  }


    // --------------------------

    // Placeholder Query
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
        order.payees,
        order.paid == "Yes" ? 1 : 0,
        order.report == "Yes" ? 1 : 0,
        order.notes,
        underReviewValue,
        order.division,
        order.program,
      ]
    );

    // Update the Division table with the new values
    await pool.query(
      `UPDATE Division
        SET Dean = ?, PEN = ?, Rep = ?, Chair = ?
        WHERE DivisionName = ?`,
      [order.dean, order.pen, order.rep, order.chair, order.division]
    );




    // Direct user back to summary page(pass success indicator as URL parameter)
    res.redirect("/?success=true");
  } catch (err) {
    console.error("SQL Update Error:", err);
    res.status(500).send("Database update failed.");
  }
});

// Define a "submit-order2" route (summary.ejs)
app.post("/submit-order2", async (req, res) => {
  const selectedDivision = req.body.division || "none";
  let [orders] = [];

  try {
    // if user selects all, the data will call all info
    if (selectedDivision === "*") {
      [orders] = await pool.query(
        "SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName;"
      );

      // Get ALL programs under review for ALL divisions
      const [programs] = await pool.query(
        "SELECT ProgramID, DivisionName, AcademicPrograms, UnderReview FROM AcademicPrograms WHERE UnderReview = 1"
      );

      return res.render("summary", {
        orders,
        selectedDivision,
        success: false,
        programs,
        groupedRecent: []
      });
    }

    // call info only for the selected division
    [orders] = await pool.query(
      "SELECT * FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName WHERE a.DivisionName = ?;",
      [selectedDivision]
    );

    // Now get ONLY the under-review programs for that specific division
    const [programs] = await pool.query(
      `SELECT ProgramID, DivisionName, AcademicPrograms, UnderReview
       FROM AcademicPrograms
       WHERE UnderReview = 1 AND DivisionName = ?`,
      [selectedDivision]
    );

    res.render("summary", {
      orders,
      selectedDivision,
      success: false,
      programs,
      groupedRecent: []
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).send("Database error: " + err.message);
  }
});

app.get("/recent-changes", async (req, res) => {
  const [changes] = await pool.query(
    "SELECT * FROM RecentChanges ORDER BY ChangedAt DESC LIMIT 100"
  );
  res.render("recentChanges", { changes });
});

// Route: Get programs by review year (JSON only for now)
app.get("/review-schedule", async (req, res) => {
  const year = req.query.year || null;

  try {
    // Get distinct years available in the schedule (for later use in the UI)
    const [yearsRows] = await pool.query("SELECT DISTINCT ReviewYear FROM ReviewSchedule ORDER BY ReviewYear;");

    // Shape the years into an array ["2028-29, "2029-30"]
    const years = yearsRows.map(r => r.ReviewYear);

    let programs = [];

    if (year) {
      // If a specific year is requested, get programs scheduled for that year
      const [rows] = await pool.query(
        `
        SELECT
          rs.ReviewYear,
          ap.ProgramID,
          ap.AcademicPrograms,
          ap.DivisionName
        FROM ReviewSchedule rs
        JOIN AcademicPrograms ap ON rs.ProgramID = ap.ProgramID
        WHERE rs.ReviewYear = ?
        ORDER BY ap.DivisionName, ap.AcademicPrograms;
        `,
        [year]
      );

      programs = rows;
    }
    res.json({
      selectedYear: year,
      availableYears: years,
      programs
    });
  } catch (err) {
    console.error("Error in /review-schedule:", err);
    res.status(500).send("Database error" + err.message);
  }
});
// http://localhost:3007/review-schedule-view
// Route: Render the Review Schedule page (EJS)
app.get("/review-schedule-view", async (req, res) => {
  const year = req.query.year || null;

  try {
    // 1. Get all available years
    const [yearsRows] = await pool.query(
      "SELECT DISTINCT ReviewYear FROM ReviewSchedule ORDER BY ReviewYear;"
    );
    const [orders] = await pool.query("SELECT d.DivisionName, AcademicPrograms, a.ProgramID FROM AcademicPrograms a JOIN Division d ON a.DivisionName = d.DivisionName;");
    
    const availableYears = yearsRows.map(r => r.ReviewYear);

    // 2. If a year is selected, get programs
    let programs = [];

    if (year) {
      const [rows] = await pool.query(
        `
        SELECT 
          rs.ReviewYear,
          ap.ProgramID,
          ap.AcademicPrograms,
          ap.DivisionName
        FROM ReviewSchedule rs
        JOIN AcademicPrograms ap ON rs.ProgramID = ap.ProgramID
        WHERE rs.ReviewYear = ?
        ORDER BY ap.DivisionName, ap.AcademicPrograms;
        `,
        [year]
      );

      programs = rows;
    }

    // 3. Render the EJS page (we will create this next step)
    res.render("reviewSchedule", {
      availableYears,
      selectedYear: year,
      programs,
      orders
    });
    // TEST
    // res.json({
    //   availableYears,
    //   selectedYear: year,
    //   programs,
    //   orders
    // });

  } catch (err) {
    console.error("Error in /review-schedule-view:", err);
    res.status(500).send("Database error: " + err.message);
  }
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
