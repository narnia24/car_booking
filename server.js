const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "car_booking_system",
});

// Connect to the database
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

app.use(bodyParser.json());
app.use(express.static("public"));

// CRUD operations for Cars
app.post("/cars", (req, res) => {
  const { Make, Model, Year, Color, PricePerDay, Availability } = req.body;
  if (
    !Make ||
    !Model ||
    !Year ||
    !Color ||
    !PricePerDay ||
    Availability === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }
  const query =
    "INSERT INTO Cars (Make, Model, Year, Color, PricePerDay, Availability) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [Make, Model, Year, Color, PricePerDay, Availability],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
      } else {
        res.json({ success: true });
      }
    }
  );
});

app.put("/cars/:id", (req, res) => {
  const id = req.params.id;
  const { Make, Model, Year, Color, PricePerDay, Availability } = req.body;

  if (
    !Make ||
    !Model ||
    !Year ||
    !Color ||
    !PricePerDay ||
    Availability === undefined
  ) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  const query =
    "UPDATE Cars SET Make = ?, Model = ?, Year = ?, Color = ?, PricePerDay = ?, Availability = ? WHERE CarID = ?";
  db.query(
    query,
    [Make, Model, Year, Color, PricePerDay, Availability, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
      } else {
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ success: false, error: "Car not found." });
        }
        res.json({ success: true });
      }
    }
  );
});

app.delete("/cars/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM Cars WHERE CarID = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

app.get("/cars", (req, res) => {
  const query = "SELECT * FROM Cars";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.get("/cars/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Cars WHERE carID = ?", [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// CRUD operations for Users
app.post("/users", (req, res) => {
  const { Name, Email, Phone, Address } = req.body;
  if (!Name || !Email || !Phone || !Address) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }
  const query =
    "INSERT INTO Users (Name, Email, Phone, Address) VALUES (?, ?, ?, ?)";
  db.query(query, [Name, Email, Phone, Address], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const { Name, Email, Phone, Address } = req.body;

  if (!Name || !Email || !Phone || !Address) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  const query =
    "UPDATE Users SET Name = ?, Email = ?, Phone = ?, Address = ? WHERE UserID = ?";
  db.query(query, [Name, Email, Phone, Address, id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    } else {
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, error: "User not found." });
      }
      res.json({ success: true });
    }
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM Users WHERE UserID = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

app.get("/users", (req, res) => {
  const query = "SELECT * FROM Users";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM Users WHERE UserID = ?", [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// CRUD operations for Bookings
app.post("/bookings", (req, res) => {
  const { UserID, CarID, StartDate, EndDate, TotalAmount, Status } = req.body;
  if (!UserID || !CarID || !StartDate || !EndDate || !TotalAmount || !Status) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }
  const query =
    "INSERT INTO Bookings (UserID, CarID, StartDate, EndDate, TotalAmount, Status) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    query,
    [UserID, CarID, StartDate, EndDate, TotalAmount, Status],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
      } else {
        res.json({ success: true });
      }
    }
  );
});

app.put("/bookings/:id", (req, res) => {
  const id = req.params.id;
  const { UserID, CarID, StartDate, EndDate, TotalAmount, Status } = req.body;

  if (!UserID || !CarID || !StartDate || !EndDate || !TotalAmount || !Status) {
    return res
      .status(400)
      .json({ success: false, error: "All fields are required." });
  }

  const query =
    "UPDATE Bookings SET UserID = ?, CarID = ?, StartDate = ?, EndDate = ?, TotalAmount = ?, Status = ? WHERE BookingID = ?";
  db.query(
    query,
    [UserID, CarID, StartDate, EndDate, TotalAmount, Status, id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
      } else {
        if (result.affectedRows === 0) {
          return res
            .status(404)
            .json({ success: false, error: "Booking not found." });
        }
        res.json({ success: true });
      }
    }
  );
});

app.delete("/bookings/:id", (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM Bookings WHERE BookingID = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

app.get("/bookings", (req, res) => {
  const query = "SELECT * FROM Bookings";
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.json(results);
    }
  });
});

app.get("/bookings/:id", (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT * FROM Bookings WHERE BookingID = ?",
    [id],
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
